import { Expose, Exclude, Type } from "class-transformer";

export class LocationResponceDto{
    @Expose()
    id: number;

    @Expose()
    name: string;

    // @Expose()
    // @Type(() => PersonalInfoResponceDto)
    // birthPlace?: PersonalInfoResponceDto[];

    @Exclude()
    createdAt?: Date;

    @Exclude()
    updatedAt?: Date;

    @Exclude()
    deletedAt?: Date;
}