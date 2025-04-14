import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as fs from 'fs';
import * as mysql from 'mysql2';
import { promisify } from 'util';
import * as dotenv from 'dotenv';
import * as path from "path";
import * as Seven from "node-7z";
import '7zip-bin';

dotenv.config();

@Injectable()
export class BackupService implements OnModuleDestroy {
    private dbConnection: mysql.Connection;
    private backupDir: string;
    private archieveDir: string;
    private maxBackups: number;

    constructor(){
        this.backupDir = process.env.BACKUP_DIR || '/tmp/';
        this.archieveDir = process.env.ARCHIEVE_DIR || '/tmp/backups';
        this.maxBackups = parseInt(process.env.MAX_BACKUPS || '30', 10);

        this.dbConnection = mysql.createConnection({
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
        });

        this.dbConnection.connect((err) => {
            if(err){
                console.error('Error connecting to database', err);
                throw err;
            }
        })

        this.ensureDirectories();
    }

    ensureDirectories(): void {
        if(!fs.existsSync(this.backupDir)){
            try{
                fs.mkdirSync(this.backupDir, { recursive: true });
                console.log(`Created backup directory: ${this.backupDir}`);
            } catch(error){
                console.error(`Failed to create backup directory ${this.backupDir}`)
            }
        }

        if(!fs.existsSync(this.archieveDir)){
            try{
                fs.mkdirSync(this.archieveDir, { recursive: true });
                console.log(`Created archieve directory: ${this.archieveDir}`);
            } catch(error){
                console.error(`Failed to create archieve directory ${this.archieveDir}`)
            }
        }
    }

    @Cron(CronExpression.EVERY_DAY_AT_NOON)
    async backupDatabase(){

        console.log('Backup task started', new Date());
        const timeStamp = new Date().toISOString().replace(/[:]/g, '-');
        const backupFile = `${this.backupDir}/database-backup-${timeStamp}.sql`;

        this.ensureDirectories();

        try{
            const schema = await this.getSchema();
            const data = await this.getData(schema);

            fs.writeFileSync(backupFile, this.generateBackupSQL(schema, data));
            console.log(`Backup file created: ${backupFile}`);

            await this.archieveBackup(backupFile, timeStamp);

            fs.unlinkSync(backupFile);
            console.log(`Backup file deleted: ${backupFile}`);

            await this.rotateBackups();

            return true;
        } catch(error){
            console.error(`Error creating backup: ${error}`);
            throw error;
        }
    }

    private async getSchema(){
        const query = promisify(this.dbConnection.query).bind(this.dbConnection);
        const schema: any = {};

        const results = await query('SHOW TABLES');

        for(const row of results){
            const tableName = row[`Tables_in_${this.dbConnection.config.database}`];
            schema[tableName] = await this.getTableName(tableName);
        }

        return schema;
    }

    private async getTableName(tableName: string){
        const query = promisify(this.dbConnection.query).bind(this.dbConnection);
        const results = await query(`DESCRIBE ${tableName}`);

        const schema: any = {};
        for(const row of results){
            schema[row.Field] = row.Type;
        }

        return schema;
    }

    private async getData(schema: any){
        const query = promisify(this.dbConnection.query).bind(this.dbConnection);
        const data: any = {};

        for(const tableName in schema){
            const results = await query(`SELECT * FROM ${tableName}`);
            data[tableName] = results;
        }

        return data;
    }

    private async rotateBackups(){
        try{
            const backups = await this.getBackupsList();

            if(backups.length > this.maxBackups){
                backups.sort((a, b) => a.date.getTime() - b.date.getTime());
                const backupsToDelete = backups.slice(0, backups.length - this.maxBackups);

                for(const backup of backupsToDelete){
                    const filePath = path.join(this.archieveDir, backup.name);
                    fs.unlinkSync(filePath);
                    console.log(`Deleted old backup: ${backup.name}`);
                }
            }
        } catch(error){
            console.error('Error rotating backups', error);
        }
    }

    private generateBackupSQL(schema: any, data: any){
        let sql = '';
        
        for(const tableName in schema){

            sql += `DROP TABLE IF EXISTS ${tableName};\n`;
            sql += `CREATE TABLE ${tableName} (\n`;
            
            const columns = [];

            for(const fieldName in schema[tableName]){
                sql += ` ${fieldName} ${schema[tableName][fieldName]},\n`;
            }

            sql = columns.join(',\n');
            sql += `\n);\n\n`;

            if(data[tableName] && data[tableName].length > 0){
                for(const row of data[tableName]){
                    const escapedValues = Object.values(row).map((value) => this.dbConnection.escape(value));
                    sql += `INSERT INTO ${tableName} VALUES (${escapedValues.join(', ')}); \n`
                };
            }

            sql += '\n';
        }

        return sql;
    }

    private async archieveBackup(backupFile: string, timeStamp: string){

        if(!fs.existsSync(this.archieveDir)){
            fs.mkdirSync(this.archieveDir, { recursive: true });
        }

        const archieveFile = path.join(this.archieveDir, `database-backup-${timeStamp}.7z`);
        console.log(`Archiving backup to ${archieveFile}`);

        return new Promise((resolve, reject) => {
            const seven = Seven.add(archieveFile, backupFile, {
                $bin: Seven.path7za,
            });

            seven.on('end', () => {
                console.log(`Backup archieved file at ${archieveFile}`);
                resolve(true);
            });

            seven.on('error', (err) => {
                console.error(`Error createing archieve ${err}`);
                reject(err);
            });
        })
    };

    async getBackupsList(): Promise<{ name: string; size: number; date: Date; }[]>{
        return new Promise((resolve, reject) => {

            if(!fs.existsSync(this.archieveDir)){
                console.error(`Directory ${this.archieveDir} does not exist`);
                return reject(`Directory ${this.archieveDir} does not exist`);
            }
            
            fs.readdir(this.archieveDir, async (err, files) => {
                if(err){
                    console.error('Error reading directory', err);
                    return reject('Could not list backups');
                }
                
                console.log(`File found ${files}`);

                try{
                    const backups = files.filter(file => 
                        file.endsWith('.gz') || 
                        file.endsWith('.7z') || 
                        file.endsWith('.tar.gz'));
                        
                    console.log(`Filtered backups: ${backups}`);

                    const backupDetails = await Promise.all(
                        backups.map(async (file) => {
                            const filePath = path.join(this.archieveDir, file);
                            const stats = await fs.promises.stat(filePath);
                        
                            return {
                                name: file,
                                size: stats.size,
                                date: stats.mtime,
                            };
                        })
                    );
                    
                    console.log(`Backup details: ${backupDetails}`);
                    resolve(backupDetails);

                } catch (error) {
                    console.error(`Error fetching file stats ${error}`);
                    reject('Error fetching backup details');
                }
                
            });
        });
    }

    onModuleDestroy() {
        this.dbConnection.end((err) => {
            if(err){
                console.error('Error closing the database connection: ', err);
            }
        })
    }
}
