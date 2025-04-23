import { Expose, Exclude, Type} from 'class-transformer';
// import { FacultyResponceDto }
export class ResponceDepartmentDto{
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    shortName: string;

    @Expose()
    facultyId: number;

    // @Expose()
    // @Type(() => FacultyResponceDto)
    // faculty?: FacultyResponceDto;

    // @Expose()
    // @Type(() => UniversityEmployementResponceDto)
    // universityEmployement?: UniversityEmployementResponceDto[];

    // @Expose()
    // @Type(() => ResponceStafdfDto)
    // staff?: ResponceStafdfDto[];

    @Exclude()
    createdAt?: Date;

    @Exclude()
    updatedAt?: Date;

    @Exclude()
    deletedAt?: Date;

}