import { Expose, Exclude, Type } from 'class-transformer';
import { EmployeeResponceDto } from '../employee/responce';

export class EducationResponceDto{
    @Expose()
    id: number;

    @Expose()
    employeeId: number;

    @Expose()
    degreeOfEducation: string;

    @Expose()
    diploma: string;

    @Expose()
    numberOfDiploma: string;

    @Expose()
    nameOfEndHighUniversity: string;

    @Expose()
    nameOfEndMiddleUniversity: string;

    @Expose()
    graduationYear: number;

    @Expose()
    specialty: string;

    @Expose()
    qualification: string;

    @Expose()
    @Type(() => EmployeeResponceDto)
    employee?: EmployeeResponceDto;

    @Expose()
    get educationLevel(): string{
        if(this.nameOfEndHighUniversity){
            return 'Higher'
        } else if(this.degreeOfEducation){
            return 'Middle'
        } else {
            return 'Junior'
        }
    }

    @Expose()
    get yaerFromGraduation(): number | null {
        if(!this.graduationYear) return null;
        const currentYear = new Date().getFullYear()
        return currentYear - this.graduationYear
    }
}