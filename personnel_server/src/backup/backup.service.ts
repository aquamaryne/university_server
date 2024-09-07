import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
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
    private backupDir =  process.env.BACKUP;
    private archieveDir = process.env.ARCHIEVE;

    constructor(){
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
    }

    @Cron('0 19 */2 * *')
    async backupDatabase(){
        console.log('Backup task started', new Date());
        const timeStamp = new Date().toISOString().replace(/[:]/g, '-');
        const backupFile = `${this.backupDir}/database-backup-${timeStamp}.sql`;

        if(!fs.existsSync(this.backupDir)){
            fs.mkdirSync(this.backupDir, { recursive: true });
            console.log(`Created archieve directory: ${this.backupDir}`);
        }

        if(!fs.existsSync(this.archieveDir)){
            fs.mkdirSync(this.archieveDir, { recursive: true });
            console.log(`Created archieve directory: ${this.archieveDir}`);
        }

        const schema = await this.getSchema();
        const data = await this.getData(schema);

        fs.writeFileSync(backupFile, this.generateBackupSQL(schema, data));
        console.log(`Database backup saved to ${this.backupDir}`);

        await this.archieveBackup(backupFile, timeStamp);
    }

    private async getSchema(){
        const query = promisify(this.dbConnection.query).bind(this.dbConnection);
        const schema: any = {};

        const results = await query('SHOW TABLES');

        for(const row of results){
            const tableName = row[`Tables_in_${this.dbConnection.config.database}`];
            schema[tableName] = await this.getTableName(tableName);
        }
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

    private generateBackupSQL(schema: any, data: any){
        let sql = '';
        
        for(const tableName in schema){
            sql += `CREATE TABLE ${tableName} (\n`;

            for(const fieldName in schema[tableName]){
                sql += ` ${fieldName} ${schema[tableName][fieldName]},\n`;
            }

            sql = sql.replace(/,\n$/, '\n');
            sql += `);\n\n`;

            for(const row of data[tableName]){
                const escapedValues = Object.values(row).map((value) => this.dbConnection.escape(value));
                sql += `INSERT INTO ${tableName} VALUES (${escapedValues.join(', ')});\n`;
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
            fs.readdir(this.archieveDir, (err, files) => {
                if(err){
                    console.error('Error reading directory', err);
                    return reject('Could not list backups');
                }
                
                const backups = files.filter(file => file.endsWith('.7z'));
                const backupDetails = backups.map(file => {
                    const filePath = path.join(this.backupDir, file);
                    const stats = fs.statSync(filePath);
                    
                    return {
                        name: file,
                        size: stats.size,
                        date: stats.mtime,
                    };
                });
                
                resolve(backupDetails);
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
