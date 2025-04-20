import { Exclude, Expose, Transform } from "class-transformer";
export class PassportDataResponceDto{
    @Expose()
    id: number;

    @Expose()
    emloyeeId: number;

    @Expose()
    passport: string;

    @Expose()
    passportIssuedBy: string;

    @Expose()
    passportDateIssued: Date;

    @Expose()
    @Transform(({ obj }) => {
        if(obj.employee){
            return{
                id: obj.employee.id,
                firstName: obj.employee.firstName,
                secondName: obj.employee.secondName,
            }
        }

        return null;
    })
    employee: any;

    constructor(partial: Partial<PassportDataResponceDto>){
        Object.assign(this, partial)
    }
}