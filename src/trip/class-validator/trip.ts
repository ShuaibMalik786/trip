import { MaxLength, MinLength, IsNotEmpty, IsBoolean, ValidateNested, IsDefined, ArrayNotEmpty, IsOptional, IsMongoId } from "class-validator";
import { Type } from "class-transformer";


class Origin {
    @IsNotEmpty()
    readonly lat: number;

    @IsNotEmpty()
    readonly lng: number;

    @MaxLength(1024)
    @MinLength(1)
    @IsNotEmpty()
    readonly address: string;
}

export class TripDto {
    @IsNotEmpty()
    @IsMongoId()
    readonly userId: string;

    @MaxLength(255)
    @MinLength(2)
    @IsNotEmpty()
    readonly name: string;

    @MaxLength(1024)
    @IsNotEmpty()
    readonly description: string;

    @ValidateNested({ each: true })
    @Type(() => Origin)
    readonly origin: Origin;
}