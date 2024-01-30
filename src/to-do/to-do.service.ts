import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateToDoDto } from './dto/create-to-do.dto';
import { UpdateToDoDto } from './dto/update-to-do.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ToDo } from './entities/to-do.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ToDoService {

  constructor(
    @InjectRepository(ToDo)
    private readonly todoRepository: Repository<ToDo>,
  ) {}
  
  async create(createToDoDto: CreateToDoDto) {
    try {
      const toDo = this.todoRepository.create(createToDoDto);
      await this.todoRepository.save(toDo);
      return toDo;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Help')
    }
  }

  findAll() {
    return `This action returns all toDo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} toDo`;
  }

  update(id: number, updateToDoDto: UpdateToDoDto) {
    return `This action updates a #${id} toDo`;
  }

  remove(id: number) {
    return `This action removes a #${id} toDo`;
  }
}
