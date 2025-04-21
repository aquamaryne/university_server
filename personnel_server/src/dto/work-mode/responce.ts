import { Expose, Exclude, Type } from 'class-transformer';

export class ResponceWorkModeDto{
    @Expose()
    id: number;

    @Expose()
    name: string;

    // @Expose()
    // @Type(() => UniversityEmployementResponceDto)
    // universityEmployement?: UniversityEmployementResponceDto[];

    @Exclude()
    createdAt?: Date;

    @Exclude()
    updatedAt?: Date;

    @Exclude()
    deleteAt?: Date;
}