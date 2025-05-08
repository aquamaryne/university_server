import { Expose, Exclude, Type } from 'class-transformer';
import { EmployeeResponceDto } from '../employee/responce';

export class WorkExperienceResponceDto {
    @Expose()
    id: number;

    @Expose()
    employeeId: number;

    @Expose()
    workplaceName: string;

    @Expose()
    position: string;

    @Expose()
    startDate: string;

    @Expose()
    endDate: string;

    @Expose()
    reasonOfLeaving: string;

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
    get duration(): string {
        if(!this.startDate){
            return 'Uknown duration';
        }

        const start = new Date(this.startDate);
        const end = this.endDate ? new Date(this.endDate) : new Date();

        const diffYears = end.getFullYear() - start.getFullYear();
        const diffMonths = end.getMonth() - start.getMonth();

        let years = diffYears;
        let months = diffMonths;

        if(diffMonths < 0) {
            years -= 1;
            months += 12;
        }

        const yearsText = years > 0 ? `${years} year${years !== 1 ? 's' : ''}` : '';
        const monthsText = months > 0 ? `${months} month${months !== 1 ? 's' : ''}` : '';

        if(yearsText && monthsText){
            return `${yearsText}, ${monthsText}`;
        } else if(yearsText){
            return yearsText;
        } else if(monthsText){
            return monthsText;
        } else {
            return 'Less than a month';
        }
    }

    @Expose()
    get isCurrentJob(): boolean {
        return !this.endDate;
    }

    @Expose()
    get employeeName(): string {
        return this.employee ? `${this.employee.firstName} ${this.employee.secondName}` : 'Uknown';
    }
}