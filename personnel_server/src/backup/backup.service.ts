import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as fs from 'fs';
import * as mysql from 'mysql2';
import { promisify } from 'util';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class BackupService implements OnModuleDestroy {
    private dbConnection: mysql.Connection;

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

    @Cron('0 0 * * *')
    async backupDatabse(){
        const backupDir = '/backup';
        const backupFile = `${backupDir}/database-backup-${new Date().toISOString().replace(/[:]/g, '-')}.sql`;

        if(!fs.existsSync(backupDir)){
            fs.mkdirSync(backupDir, { recursive: true });
        }

        const schema = await this.getSchema();
        const data = await this.getData(schema);

        fs.writeFileSync(backupFile, this.generateBAckupSQL(schema, data));
        console.log(`Database backup saved to ${backupDir}`);
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

    private generateBAckupSQL(schema: any, data: any){
        let sql = '';
        
        for(const tableName in schema){
            sql += `CREATE TABLE ${tableName} (\n)`;

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

    onModuleDestroy() {
        this.dbConnection.end((err) => {
            if(err){
                console.error('Error closing the database connection: ', err);
            }
        })
    }
}
