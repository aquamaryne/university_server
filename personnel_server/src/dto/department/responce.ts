import { Expose, Exclude, Type} from 'class-transformer';
import { FacultyResponceDto } from '../faculty/responce';
import { UniversityEmployementResponseDto } from '../university-employement/responce';
import { StaffResponceDto } from '../staff/responce';
export class ResponceDepartmentDto{
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    shortName: string;

    @Expose()
    facultyId: number;

    @Expose()
    @Type(() => FacultyResponceDto)
    faculty?: FacultyResponceDto;

    @Expose()
    @Type(() => UniversityEmployementResponseDto)
    universityEmployement?: UniversityEmployementResponseDto[];

    @Expose()
    @Type(() => StaffResponceDto)
    staff?: StaffResponceDto[];

    @Exclude()
    createdAt?: Date;

    @Exclude()
    updatedAt?: Date;

    @Exclude()
    deletedAt?: Date;

}