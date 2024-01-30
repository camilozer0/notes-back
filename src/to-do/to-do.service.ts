import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateToDoDto } from './dto/create-to-do.dto';
import { UpdateToDoDto } from './dto/update-to-do.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ToDo } from './entities/to-do.entity';
import { Equal, LessThan, MoreThan, Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import { skip } from 'node:test';
import { equal } from 'assert';

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

  // async findActiveTodos( todoActive: boolean ) {
  //   const toDos = await this.todoRepository.findBy({ isActive: todoActive });
  //   return toDos;
  // }

  // async findTodayTodos( todoToday: string ) {
  //   return 'esta funcionando  el query'
  //   const todayDate =  new Date();
  //   let toDos: ToDo[];
  //   if ( todoToday ) {
  //     toDos = await this.todoRepository.find({
  //       where: {
  //         dueDate: Equal( todayDate )
  //       }
  //     })
  //   } else {
  //     toDos = await this.todoRepository.find({
  //       where: {
  //         dueDate: LessThan( todayDate )
  //       }
  //     })
  //   }
  //   return toDos;
  // }

  async findTodayTodos( todoActive: boolean, todoToday: boolean) {
    // let toDos: ToDo[];
    // if ( todoActive == undefined ) {
    //   const todayDate = new Date();
    //   if ( todoToday ) {
    //     toDos = await this.todoRepository.find({
    //       where: {
    //           dueDate: Equal( todayDate )
    //       }
    //     })
    //   } else {
    //     toDos = await this.todoRepository.find({
    //       where: {
    //         dueDate: LessThan( todayDate )
    //       }
    //     })
    //   }
    // } else {
    //   toDos = await this.todoRepository.findBy({ isActive: todoActive })
    // }
    // return toDos;
  }

  async findOne(searchValue: string) {
    let toDo: ToDo;
    if ( isUUID(searchValue) ) {
      toDo = await this.todoRepository.findOneBy({ id: searchValue })
    }
    if ( !toDo ) throw new NotFoundException(`The todo wasn't foundks`)
    return toDo;
  }

  update(id: number, updateToDoDto: UpdateToDoDto) {
    return `This action updates a #${id} toDo`;
  }

  remove(id: number) {
    return `This action removes a #${id} toDo`;
  }
}
