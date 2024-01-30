import { Type } from "class-transformer";
import { IsBoolean, IsOptional } from "class-validator";


export class FiltersDto {


    @IsOptional()
    @IsBoolean()
    @Type( () => Boolean )
    todoActive?: boolean;

    @IsOptional()
    @IsBoolean()
    @Type( () => Boolean )
    todoToday?: boolean;
    
}