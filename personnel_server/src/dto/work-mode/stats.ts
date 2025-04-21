import { Expose } from "class-transformer";

export class WorkModeStatsDto{
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    employementCount: number;
}

export class PopularWorkModeDto{
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    employementCount: number;
}