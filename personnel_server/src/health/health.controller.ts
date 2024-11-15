import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { 
        HealthCheck, 
        HealthCheckService, 
        HttpHealthIndicator, 
        MemoryHealthIndicator,
        DiskHealthIndicator,
        HealthCheckResult, 
} from '@nestjs/terminus';
import { DataSource } from 'typeorm'
import { TypeOrmHealthIndicator } from '@nestjs/terminus';
import { ApiKeyGuard } from 'src/api_key/api_key.guard';

@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private http: HttpHealthIndicator,
        private db: TypeOrmHealthIndicator,
        private memory: MemoryHealthIndicator,
        private disk: DiskHealthIndicator,
        private dataSource: DataSource,
    ) {}

    @Get()
    @UseGuards(ApiKeyGuard)
    @Render('index')
    @HealthCheck()
    async check(){
        const healthChecksResult: HealthCheckResult = await this.health.check([
            async () => this.http.pingCheck('', ''),
            async () => this.db.pingCheck('database', { connection: this.dataSource }),
            async () => this.memory.checkHeap('memory_heap', 300 * 1024 * 1024),
            async () => this.memory.checkRSS('memory_rss', 300 * 1024 * 1024),
            async () => {
                const isDbConnected = this.dataSource.isInitialized;
                if(!isDbConnected){
                    throw new Error('Database error connection')
                }

                return {
                    database: {
                        status: 'up'
                    }
                };
            },       
        ]);

        return {
            status: healthChecksResult.status,
            details: healthChecksResult.details,  
        }
    };
};
