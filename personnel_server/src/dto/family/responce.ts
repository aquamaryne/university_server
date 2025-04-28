import { Expose, Exclude, Type } from 'class-transformer';
import { EmployeeResponceDto } from '../employee/responce';

export class FamiltyResponceDto{
    @Expose()
    id: number;

    @Expose()
    employeeId: number;

    @Expose()
    relationType: string;

    @Expose()
    fullName: string;

    @Expose()
    @Type(() => EmployeeResponceDto)
    employee?: EmployeeResponceDto;

    @Exclude()
    createdAt?: Date;

    @Exclude()
    updatedAt?: Date;

    @Exclude()
    deletedAt?: Date;

    @Expose()
    get relationCategory(): string{
        const lowerRelation = this.relationType?.toLowerCase() || '';
        if(lowerRelation.includes('spouse') 
            || lowerRelation.includes('wife') 
            || lowerRelation.includes('husband')
            || lowerRelation.includes('дружина')
            || lowerRelation.includes('чоловік')
        ){
            return 'Spouse';
        } else if(lowerRelation.includes('child')
            || lowerRelation.includes('son')
            || lowerRelation.includes('daughter')
            || lowerRelation.includes('син')
            || lowerRelation.includes('донька')
        ){
            return 'Child'
        } else if(lowerRelation.includes('parent')
            || lowerRelation.includes('mother')
            || lowerRelation.includes('father')
            || lowerRelation.includes('мати')
            || lowerRelation.includes('тато')
        ){
            return 'Parent'
        } else {
            return 'Other'
        }
    }
}