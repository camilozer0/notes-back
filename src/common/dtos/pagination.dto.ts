import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";


export class PaginationDto {
    
    @IsOptional()
    @IsPositive()
    @Type( () => Number )
    limit?: number;

    @Min(0)
    @IsPositive()
    @Type( () => Number )
    offset?: number;
}