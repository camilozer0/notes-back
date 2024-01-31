import { Transform } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, MaxLength, MinDate, MinLength, isDateString } from "class-validator";
import * as moment from "moment";

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
    @IsOptional()
    isActive: boolean;

    @IsString({
        each: true,
    })
    @IsArray()
    tags: string[];
    
}
