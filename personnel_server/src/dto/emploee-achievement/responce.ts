import { Expose, Exclude, Type } from "class-transformer";
import { EmployeeResponceDto } from "../employee/responce";
import { ResponceAchieveDto } from "../achieve/responce";

export class EmployeeAchievementResponceDto{
    @Expose()
    id: number;

    @Expose()
    employeeId: number;

    @Expose()
    achievementTypeId: number;

    @Expose()
    dataReceived: Date;

    @Expose()
    description: string;

    @Expose()
    certificateNumber: string;

    @Expose()
    @Type(() => EmployeeResponceDto)
    employee?: EmployeeResponceDto;

    @Expose()
    @Type(() => ResponceAchieveDto)
    achievementType?: ResponceAchieveDto;

    @Exclude()
    createdAt?: number;

    @Exclude()
    updatedAt?: number;

    @Exclude()
    deletedAt?: number;

    @Expose()
    get yearFromAchievement(): number | null {
        if(!this.dataReceived) return null;

        const today = new Date;
        const achievementDate = new Date(this.dataReceived);
        return Math.floor((today.getTime() - achievementDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25))
    }
}