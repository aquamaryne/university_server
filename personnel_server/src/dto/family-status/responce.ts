import { Expose, Exclude, Type } from 'class-transformer';

export class FamilyStatusResponceDto{
    @Expose()
    id: number;

    @Expose()
    status: string;

    // @Expose()
    // @Type(() => PersonalInfoResponceDto)
    // familyStatus?: PersonalInfoResponceDto[];

    @Exclude()
    createdAt?: Date;

    @Exclude()
    updatedAt?: Date;

    @Exclude()
    deletedAt?: Date; 
}