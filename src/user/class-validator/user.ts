import { MaxLength, MinLength, IsNotEmpty, IsBoolean, ValidateNested, IsDefined, ArrayNotEmpty, IsOptional, IsMongoId, Min, IsNumber, Max } from "class-validator";

export class UserDto {

    @MaxLength(255)
    @MinLength(1)
    @IsOptional()
    readonly name: string;

    @MaxLength(255)
    @MinLength(1)
    @IsNotEmpty()
    readonly email: string;


    @MaxLength(255)
    @MinLength(1)
    @IsNotEmpty()
    readonly password: string;
}