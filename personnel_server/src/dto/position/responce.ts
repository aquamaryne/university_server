import { Expose, Exclude, Type } from 'class-transformer';
import { UniversityEmployementResponseDto } from '../university-employement/responce';
export class PositionResponceDto{
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    isAcademic: boolean;

    @Expose()
    isAdministative: boolean;

    @Expose()
    @Type(() => UniversityEmployementResponseDto)
    universityEmployement?: UniversityEmployementResponseDto[];

    @Exclude()
    createdAt?: Date;

    @Exclude()
    updatedAt?: Date;

    @Exclude()
    deletedAt?: Date;

    @Expose()
    get positionType(): string {
        if(this.isAcademic && this.isAdministative){
            return 'Academic and Administrative';
        } else if (this.isAcademic){
            return 'Academic';
        } else if (this.isAdministative){
            return 'Administrative';
        } else {
            return 'Other';
        }
    }
}