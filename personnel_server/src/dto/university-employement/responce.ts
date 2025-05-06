import { Expose, Exclude, Type } from 'class-transformer';
import { EmployeeResponceDto } from '../employee/responce';
import { ResponceDepartmentDto } from '../department/responce';
import { PositionResponceDto } from '../position/responce';
import { ResponceWorkModeDto } from '../work-mode/responce';

export class UniversityEmployementResponseDto{
    @Expose()
    id: number;

    @Expose()
    employeeId: number;

    @Expose()
    departmentId: number;

    @Expose()
    positionId: number;

    @Expose()
    dateOfAccept: Date;

    @Expose()
    dateOfPositionStart: Date;

    @Expose()
    orderNumber: string;

    @Expose()
    orderDate: number;

    @Expose()
    workModeId: number;

    @Expose()
    totalExperienceYears: number;

    @Expose()
    continuousWorkYears: number;

    @Expose()
    employementContract: string;

    @Expose()
    employementContractEndDate: Date;

    @Expose()
    previousJobs: string;

    @Expose()
    @Type(() => EmployeeResponceDto)
    employee?: EmployeeResponceDto;

    @Expose()
    @Type(() => ResponceDepartmentDto)
    department?: ResponceDepartmentDto;

    @Expose()
    @Type(() => PositionResponceDto)
    position?: PositionResponceDto;

    @Expose()
    @Type(() => ResponceWorkModeDto)
    workMode?: ResponceWorkModeDto;

    @Exclude()
    createdAt?: Date;

    @Exclude()
    updatedAt?: Date;

    @Exclude()
    deletedAt?: Date;

    @Expose()
    get employeeName() : string {
        return this.employee ? `${this.employee.firstName} ${this.employee.secondName}` : 'Unknown';
    }

    @Expose()
    get departmeName() : string {
        return this.department ? this.department.name : 'Unassigned'
    }

    @Expose()
    get positionName() : string {
        return this.position ? this.position.name : 'Unassigned'
    }

    @Expose()
    get workModeName() : string {
        return this.workMode ? this.workMode.name : 'Unspecified'
    }

    @Expose()
    get experienceLevel() : string {
        if(this.totalExperienceYears === null || this.totalExperienceYears === undefined) { 
            return 'Uknown'
        }

        if(this.totalExperienceYears < 2) {
            return 'Junior';
        } else if (this.totalExperienceYears < 5) {
            return 'Middle';
        } else if (this.totalExperienceYears < 10) {
            return 'Senior';
        } else {
            return 'Expert';
        }
    }

    @Expose()
    get contractStatus() : string {
        if(!this.employementContractEndDate){
            return 'No contract end date';
        }

        const today = new Date()
        const endDate = new Date(this.employementContractEndDate);
        const daysRemaining = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        if(daysRemaining < 0){
            return 'Expired';
        } else if(daysRemaining < 30){
            return `Expiring soon (${daysRemaining} days)`;
        } else {
            return `Active (${daysRemaining} days remaining)`;
        }
    }
}