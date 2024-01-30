import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ToDo } from './entities/to-do.entity';
import { Equal, LessThan, MoreThan, Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import { equal } from 'assert';
import { CreateToDoDto, UpdateToDoDto, FiltersDto } from './dto';
import { filter } from 'rxjs';

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

  async findtodosWithFilters( filtersDto: FiltersDto ) {
    const { todoActive, todoToday } = filtersDto;
    let toDos: ToDo[];
    if ( todoActive === undefined ) {
      const todayDate = new Date();
      if ( todoToday ) {
        toDos = await this.todoRepository.find({
          where: {
              dueDate: Equal( todayDate )
          }
        })
      } else {
        toDos = await this.todoRepository.find({
          where: {
            dueDate: MoreThan( todayDate )
          }
        })
      }
    } else {
      toDos = await this.todoRepository.findBy({ isActive: todoActive })
    }
    console.log(todoActive, todoToday)
    return toDos;
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
