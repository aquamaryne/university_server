import { Expose, Exclude, Type } from 'class-transformer';
import { UniversityEmployementResponseDto } from '../university-employement/responce';
export class ResponceWorkModeDto{
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    @Type(() => UniversityEmployementResponseDto)
    universityEmployement?: UniversityEmployementResponseDto[];

    @Exclude()
    createdAt?: Date;

    @Exclude()
    updatedAt?: Date;

    @Exclude()
    deleteAt?: Date;
}