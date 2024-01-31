import { Transform, Type } from "class-transformer";
import { IsBoolean, IsOptional } from "class-validator";


export class FiltersDto {

    @IsOptional()
    //@IsBoolean()
    //@Type( () => Boolean )
    @Transform( ({value}) => value )
    todoActive?: boolean;

    @IsOptional()
    //@IsBoolean()
    //@Type( () => Boolean )
    @Transform( ({value}) => value )
    todoToday?: boolean;
    
}