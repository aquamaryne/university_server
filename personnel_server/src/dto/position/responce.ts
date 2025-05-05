import { Expose, Exclude, Type } from 'class-transformer';

export class PositionResponceDto{
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    isAcademic: boolean;

    @Expose()
    isAdministative: boolean;

    // @Expose()
    // @Type(() => UniversityEmployementResponceDto)
    // universityEmployement?: UniversityEmployementRepsonceDto[];

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