import { PartialType } from "@nestjs/mapped-types";
import { CreatePassportDataDto } from "./create";

export class UpdatePassportDataDto extends PartialType(CreatePassportDataDto) {}