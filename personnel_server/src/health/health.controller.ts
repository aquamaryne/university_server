import { Controller, Get } from '@nestjs/common';
import { 
        HealthCheck, 
        HealthCheckService, 
        HttpHealthIndicator, 
        MemoryHealthIndicator,
        DiskHealthIndicator, 
} from '@nestjs/terminus';
import { DataSource } from 'typeorm'
import { TypeOrmHealthIndicator } from '@nestjs/terminus';
import { Public } from 'src/api_key/public';

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

    @Public()
    @Get()
    @HealthCheck()
    check(){
        return this.health.check([
            async () => this.http.pingCheck('', ''),
            async () => this.db.pingCheck('database', { connection: this.dataSource }),
            async () => this.memory.checkHeap('memory_heap', 300 * 1024 * 1024),
            async () => this.memory.checkRSS('memory_rss', 300 * 1024 * 1024),
            async () => this.disk.checkStorage('disk_healt', {
                thresholdPercent: 0.5,
                path: 'C:\\'
            }),
            async () => {
                const isDbConnected = this.dataSource.isInitialized;
                if(!isDbConnected){
                    throw new Error('Database error connection')
                }

                return {
                    database: {
                        status: 'up'
                    }
                }
            }         
        ]) 
    }
}