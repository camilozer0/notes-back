import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateToDoDto } from './dto/create-to-do.dto';
import { UpdateToDoDto } from './dto/update-to-do.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ToDo } from './entities/to-do.entity';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';

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
      // TODO: verificar si aparece el error como tratarlo
      console.log(error);
      throw new InternalServerErrorException('Help')
    }
  }

  async findAll( todoActive: boolean ) {
    const toDos = await this.todoRepository.findBy({ isActive: todoActive });
    return toDos;
  }

  async findOne(searchValue: string) {
    let toDo: ToDo;
    if ( isUUID(searchValue) ) {
      toDo = await this.todoRepository.findOneBy({ id: searchValue })
      return toDo;
    }
    return `the task with id #${searchValue} has not been found`;
  }

  update(id: number, updateToDoDto: UpdateToDoDto) {
    return `This action updates a #${id} toDo`;
  }

  remove(id: number) {
    return `This action removes a #${id} toDo`;
  }
}
