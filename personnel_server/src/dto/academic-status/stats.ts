import { Expose } from 'class-transformer';

export class AcademicStatsDto {
    @Expose()
    totalAcademics: number;

    @Expose()
    totalDoctors: number;

    @Expose()
    totalCandidates: number;
}

export class AcademicExperienceStatsDto{
    @Expose()
    averageAcademicExperience: number;

    @Expose()
    averageInstituteExperience: number;
}