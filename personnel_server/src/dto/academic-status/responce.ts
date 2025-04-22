import { Exclude, Expose, Type }   from 'class-transformer';
import { EmployeeResponceDto } from '../employee/responce';
export class ResponseAcademicStatusDto {
    @Expose()
    id: number;

    @Expose()
    employeeId: number;

    @Expose()
    isCandidate: boolean;

    @Expose()
    isDoctor: boolean;

    @Expose()
    isAcademic: boolean;

    @Expose()
    totalAcademicExperience: number;

    @Expose()
    instituteAcademicExperience: number;

    @Expose()
    yearOfQualificationImprovement: number;

    @Expose()
    @Type(() => EmployeeResponceDto)
    employee?: EmployeeResponceDto;

    @Expose()
    get academicDegree(): string {
        if(this.isDoctor) return 'Doctor';
        if(this.isCandidate) return 'Candidate';
        if(this.isAcademic) return 'Academic';
        return 'None'
    }

    @Expose()
    get experienceLevel(): string {
        if(!this.totalAcademicExperience) return 'None';
        if(this.totalAcademicExperience < 5) return 'Junior';
        if(this.totalAcademicExperience < 10) return 'Middle';
        if(this.totalAcademicExperience < 15) return 'Senior';
        return 'Expert';
    }
}