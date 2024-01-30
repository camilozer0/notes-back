import { Transform } from "class-transformer";
import { IsArray, IsBoolean, IsBooleanString, IsDate, IsNotEmpty, IsString, MaxLength, MinDate, MinLength, isDateString } from "class-validator";

export class CreateToDoDto {

    @IsString()
    @MinLength(4)
    @MaxLength(50)
    title: string;

    @IsString()
    @MinLength(10)
    @MaxLength(2000)
    description: string;

    @IsDate()
    @IsNotEmpty()
    @Transform( ({ value }) => new Date(value))
    @MinDate( new Date())
    dueDate: Date;

    @IsBoolean()
    isActive: boolean;

    @IsString({
        each: true,
    })
    @IsArray()
    tags: string[];
    
}
