import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from 'src/entity/staff';
import { CreateStaffDto } from 'src/dto/staff/create';
import { UpdateStaffDto } from 'src/dto/staff/update';
import { StaffResponceDto } from 'src/dto/staff/responce';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class StaffService {
    constructor(@InjectRepository(Staff) private readonly staffRepository: Repository<Staff>){}

    
    async findAll(): Promise<StaffResponceDto[]>{
        const staffMembers = await this.staffRepository.find({
            relations: ['employee', 'department']
        });

        return plainToInstance(StaffResponceDto, staffMembers, {
            excludeExtraneousValues: true,
        });
    }
    
    async findOne(id: number): Promise<StaffResponceDto>{
        const staff = await this.staffRepository.findOne({
            where: { id },
            relations: ['employee', 'department']
        });

        return plainToInstance(StaffResponceDto, staff, {
            excludeExtraneousValues: true
        })
    }
    
    async create(createStaffDto: CreateStaffDto): Promise<StaffResponceDto>{
        const newStaff = this.staffRepository.create(createStaffDto);
        const savedStaff = await this.staffRepository.save(newStaff);
        const fullStaff = await this.staffRepository.findOne({
            where: { id: savedStaff.id },
            relations: ['employee', 'department']
        })

        return plainToInstance(StaffResponceDto, fullStaff, {
            excludeExtraneousValues: true
        })
    }

    async update(id: number, updateStaffDto: UpdateStaffDto): Promise<StaffResponceDto>{
        await this.staffRepository.update(id, updateStaffDto);
        
        const updatedStaff = await this.staffRepository.findOne({ 
            where: { id },
            relations: ['employee', 'department']
        });
        
        return plainToInstance(StaffResponceDto, updatedStaff, { 
            excludeExtraneousValues: true 
        });
    }

    async remove(id: number): Promise<void>{
        await this.staffRepository.delete(id);
    }
}
