import { IsArray, IsBoolean, IsBooleanString, IsDate, IsString, MaxLength, MinLength, isDateString } from "class-validator";

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
    dueDate: Date;

    @IsBoolean()
    isActive: boolean;

    @IsString({
        each: true,
    })
    @IsArray()
    tags: string;
    
}
