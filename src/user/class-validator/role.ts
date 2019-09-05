import { MaxLength, MinLength, IsNotEmpty, IsBoolean, ValidateNested, IsDefined, ArrayNotEmpty, IsOptional, IsMongoId } from "class-validator";
import { Type } from "class-transformer";

export class RoleDto {
    @MaxLength(255)
    @MinLength(2)
    @IsNotEmpty()
    readonly name: string;

    @MaxLength(1024)
    @IsNotEmpty()
    readonly description: string;
}