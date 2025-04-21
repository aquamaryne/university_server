import { Expose, Exclude, Type } from "class-transformer";
import { EmployeeResponceDto } from "../employee/responce";

export class VacationResponceDto{
    @Expose()
    id: number;

    @Expose()
    employee_id: number;

    @Expose()
    vacation_type: string;

    @Expose()
    start_date: Date;

    @Expose()
    end_date: Date;

    @Expose()
    order_number: number;

    @Expose()
    order_date: Date;

    @Expose()
    is_paid: boolean;

    @Expose()
    notes?: string;

    @Expose()
    @Type(() => EmployeeResponceDto)
    employee?: EmployeeResponceDto;

    @Expose()
    get duration(): number {
        if(!this.start_date || !this.end_date) return 0;

        const startDate = new Date(this.start_date);
        const endDate = new Date(this.end_date);

        const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
        return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
    }

    @Expose()
    get isPending(): boolean{
        if(!this.start_date) return false;
        const today = new Date();
        const startDate = new Date(this.start_date);

        return startDate > today;
    }

    @Expose()
    get isActive(): boolean{
        if(!this.start_date || !this.end_date) return false;

        const today = new Date();
        const startDate = new Date(this.start_date);
        const endDate = new Date(this.end_date);

        return startDate <= today && endDate >= today;
    }
}