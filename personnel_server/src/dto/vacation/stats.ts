import { Expose } from "class-transformer";

export class VacationTypeStatsDto{
    @Expose()
    type: string;

    @Expose()
    count: number;

    @Expose()
    avgDuration: number;
}

export class VacationEmployeeStatsDto{
    @Expose()
    totalCount: number;

    @Expose()
    paidCount: number;

    @Expose()
    unpaidCount: number;

    @Expose()
    totalDays: number;

    @Expose()
    paidDays: number;

    @Expose()
    unpaidDays: number;

    @Expose()
    get avarageDuration(): number {
        return this.totalCount > 0 ? this.totalDays / this.totalCount : 0;
    }

    @Expose()
    get avaragePaidDuration(): number {
        return this.paidCount > 0 ? this.paidDays / this.paidCount : 0;
    }
}

export class VacationMonthlyStatsDto{
    @Expose()
    month: number;

    @Expose()
    year: number;

    @Expose()
    count: number;

    @Expose()
    get monthName(): string {
        const monthNames = [
            'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
            'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
        ];
        return monthNames[this.month - 1];
    }

    @Expose()
    get yearMonth(): string {
        return `${this.year}-${this.month.toString().padStart(2, '0')}`;
    }
}