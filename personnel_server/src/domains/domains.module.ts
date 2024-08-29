import { Module } from '@nestjs/common';
import { Domains } from 'src/entity/domains';
import { DomainsService } from './domains.service';
import { DomainsController } from './domains.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([Domains])
    ],
    providers: [DomainsService],
    controllers: [DomainsController],
})
export class DomainsModule {}
