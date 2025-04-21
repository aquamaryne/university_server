import { Exclude, Expose, Type } from 'class-transformer';
import { EmployeeTypeResponceDto } from '../employee-type/responce';
export class EmployeeResponceDto {
    @Expose()
    id: number;

    @Expose()
    indentifyNumber?: number;

    @Expose()
    uniqueCard?: string;

    @Expose()
    personalCardNumber?: string;

    @Expose()
    firstName: string;

    @Expose()
    secondName: string;

    @Expose()
    fatherly?: string;

    @Expose()
    dateOfBirth?: Date;

    @Expose()
    sex?: string;

    @Expose()
    employeeTypeId?: number;

    @Expose()
    @Type(() => EmployeeTypeResponceDto)
    employeeType?: EmployeeTypeResponceDto;

    @Expose()
    dateOfEnterCard?: Date;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;

    @Expose()
    deletedAt?: Date;

    @Expose()
    getFullName(): string {
        return `${this.firstName} ${this.secondName} ${this.fatherly ? ' ' + this.fatherly: ' '}`;
    }

    @Expose()
    get age(): number | null {
        if(!this.dateOfBirth) return null;
        const today = new Date();
        const birthDate = new Date(this.dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if(monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())){
            age--;
        }

        return age;
    }
}