import { Controller, Get, Post, Body, Patch, Param, Delete, ParseBoolPipe, Query } from '@nestjs/common';
import { ToDoService } from './to-do.service';
import { CreateToDoDto } from './dto/create-to-do.dto';
import { UpdateToDoDto } from './dto/update-to-do.dto';

@Controller('todo')
export class ToDoController {
  constructor(private readonly toDoService: ToDoService) {}

  @Post()
  create(@Body() createToDoDto: CreateToDoDto) {
    return this.toDoService.create(createToDoDto);
  }

  @Get()
  findAll(@Query('todoActive', ParseBoolPipe) todoActive: boolean) {
    return this.toDoService.findAll(todoActive);
  }

  @Get(':searchValue')
  findOne(@Param('searchValue') searchValue: string) {
    return this.toDoService.findOne(searchValue);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateToDoDto: UpdateToDoDto) {
    return this.toDoService.update(+id, updateToDoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toDoService.remove(+id);
  }
}
