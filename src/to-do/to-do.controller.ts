import { Controller, Get, Post, Body, Patch, Param, Delete, ParseBoolPipe, Query, DefaultValuePipe, ParseUUIDPipe } from '@nestjs/common';
import { ToDoService } from './to-do.service';
import { CreateToDoDto, UpdateToDoDto, FiltersDto } from './dto';

@Controller('todo')
export class ToDoController {
  constructor(private readonly toDoService: ToDoService) {}

  // Crea un toDo
  @Post()
  create(@Body() createToDoDto: CreateToDoDto) {
    return this.toDoService.create(createToDoDto);
  }
  
  @Get()
  findwithFilters(
    @Query() filtersDto: FiltersDto ) {
    return this.toDoService.findtodosWithFilters(filtersDto)
  }

  // Busca un toDo para ser editado o visto
  @Get(':searchValue')
  findOne(@Param('searchValue') searchValue: string) {
    return this.toDoService.findOne(searchValue);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateToDoDto: UpdateToDoDto) {
    return this.toDoService.update(id, updateToDoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.toDoService.remove(id);
  }
}
