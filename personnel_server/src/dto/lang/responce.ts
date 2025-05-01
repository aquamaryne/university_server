import { Expose, Exclude, Type } from 'class-transformer';
import { EmployeeResponceDto } from '../employee/responce';

export class LanguageResponceDto {
    @Expose()
    id: number;

    @Expose()
    employeeId: number;

    @Expose()
    languageName: string;

    @Expose()
    proficiencyLevel: string;

    @Expose()
    @Type(() => EmployeeResponceDto)
    employee?: EmployeeResponceDto;

    @Expose()
    get proficiencyScore(): number {
        const scoreMap = {
            'Basic': 1,
            'Intermediate': 2,
            'Advanced': 3,
            'Fluent': 4,
            'Native': 5
        };

        return scoreMap[this.proficiencyLevel] || 0;
    }

    @Exclude()
    createdAt?: Date;

    @Exclude()
    updatedAt?: Date;

    @Exclude()
    deletedAt?: Date;
}