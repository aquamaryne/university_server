import { Expose, Type } from "class-transformer";

export class TopBirthPlaceDto{
    @Expose()
    id: number;

    @Expose()
    name: string

    @Expose()
    employeeCount: number;
}

export class LocationStatsDto{
    @Expose()
    totalLocations: number;

    @Expose()
    @Type(() => TopBirthPlaceDto)
    topBirthPlaces: TopBirthPlaceDto[];

    @Expose()
    unusedLocations: number;

    @Expose()
    get usedLocationsPerccentage(): number {
        if(this.totalLocations === 0) return 0;
        return ((this.totalLocations - this.unusedLocations) / this.totalLocations) * 100;
    }
}