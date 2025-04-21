import { PartialType } from "@nestjs/mapped-types";
import { EmployeeTypeCreateDto } from "./create";

export class EmployeeTypeUpdateDto extends PartialType(EmployeeTypeCreateDto) {}