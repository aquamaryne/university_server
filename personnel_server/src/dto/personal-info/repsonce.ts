import { Expose, Exclude, Type } from "class-transformer";
import { EmployeeResponceDto } from "../employee/responce";
import { LocationResponceDto } from "../location/responce";
import { FamilyStatusResponceDto } from "../family-status/responce";

export class PersonalInfoResponceDto {
    @Expose()
    id: number;

    @Expose()
    employeeId: number;

    @Expose()
    birthPlaceId: number;

    @Expose()
    homeAddress: string;

    @Expose()
    phoneNumber: string

    @Expose()
    isPartTimer: boolean;

    @Expose()
    isUniversityEducation: boolean;

    @Expose()
    @Type(() => EmployeeResponceDto)
    employee?: EmployeeResponceDto;

    @Expose()
    @Type(() => LocationResponceDto)
    birthPlace?: LocationResponceDto;

    @Expose()
    @Type(() => FamilyStatusResponceDto)
    familyStatus?: FamilyStatusResponceDto;

    @Exclude()
    createdAt?: Date;

    @Exclude()
    updatedAt?: Date;

    @Exclude()
    deletedAt?: Date;

    @Expose()
    get employementType(): string{
        return this.isPartTimer ? 'Part-time' : 'Full-time';
    }

    @Expose()
    get educationLevel(): string {
        return this.isUniversityEducation ? 'University Education' : 'Other Education';
    }
}