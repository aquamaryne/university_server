import { Type } from "class-transformer";
import { IsArray, ValidateNested, ArrayMinSize } from "class-validator";
import { CreateLocationDto } from "./create";

export class BulkCreateLocationDto {
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({
        each: true,
    })
    @Type(() => CreateLocationDto)
    locations: CreateLocationDto[];
}