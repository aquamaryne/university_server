import { Expose } from "class-transformer";

export class DisciplineStatsDto{
    @Expose()
    disciplineName: string;

    @Expose()
    teacherCount: number;
}

export class TopTeacherDto{
    @Expose()
    employeeId: number;

    @Expose()
    firstName: string;

    @Expose()
    secondName: string;

    @Expose()
    fatherly?: string;

    @Expose()
    disciplineCount: number;

    @Expose()
    get fullName(): string {
        return `${this.secondName} ${this.firstName} ${this.fatherly ? ' ' + this.fatherly : ' '}`
    }
}