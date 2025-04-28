import { Expose, Exclude, Type } from 'class-transformer';
import { ResponceDepartmentDto } from '../department/responce';

export class FacultyResponceDto{
    @Expose()
    id: number;

    @Expose()
    faculty_name: string;

    @Expose()
    short_name: string;

    @Expose()
    @Type(() => ResponceDepartmentDto)
    departments?: ResponceDepartmentDto;

    @Exclude()
    createdAt?: Date;

    @Exclude()
    updatedAt?: Date;

    @Exclude()
    deleteAt?: Date;
}