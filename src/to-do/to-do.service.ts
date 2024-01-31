import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ToDo } from './entities/to-do.entity';
import { Equal, EqualOperator, LessThan, MoreThan, Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import { CreateToDoDto, UpdateToDoDto, FiltersDto } from './dto';
import  * as moment  from "moment";


@Injectable()
export class ToDoService {

  constructor(
    @InjectRepository(ToDo)
    private readonly todoRepository: Repository<ToDo>,
  ) {}
  
  // Metodo para insertar una nueva nota
  async create(createToDoDto: CreateToDoDto) {
    try {
      const toDo = this.todoRepository.create(createToDoDto);
      //toDo.dueDate = new Date().toISOString().slice(0, 10);
      await this.todoRepository.save(toDo);
      return toDo;
    } catch (error) {
      // TODO: verificar si aparece el error como tratarlo
      console.log(error);
      throw new InternalServerErrorException('Help')
    }
  }

  // Metodo para obtener una nota de acuerdo a algunos filtros
  async findtodosWithFilters( filtersDto: FiltersDto ) {
    const { todoActive, todoToday } = filtersDto;
    let toDos: ToDo[];
    // Si no viene todoActive
    if ( todoActive === undefined ) {
      const todayDate = new Date();
      const formattedDate = moment(todayDate).format('YYYY-MM-DD');
      // Si se buscan los todos del dia
      if ( todoToday ) {
        toDos = await this.todoRepository.find({
          where: {
              dueDate: Equal( formattedDate ),
              isActive: true
          }
        })
      // Si se buscan los todos que vienen
      } else {
        console.log('false today', todoToday)
        toDos = await this.todoRepository.find({
          where: {
            dueDate: MoreThan( formattedDate ),
            isActive: true
          },
          order: {
            dueDate: "ASC"
          }
        })
      }
    } else {
      toDos = await this.todoRepository.findBy({ isActive: todoActive })
    }
    return toDos;
  }

  // Metodo para obtener una tarea
  async findOne(searchValue: string) {
    let toDo: ToDo;
    if ( isUUID(searchValue) ) {
      toDo = await this.todoRepository.findOneBy({ id: searchValue })
    }
    if ( !toDo ) throw new NotFoundException(`The todo wasn't found`);
    console.log(moment(toDo.dueDate).format('YYYY-MM-DD'))
    return toDo;
  }

  update(id: number, updateToDoDto: UpdateToDoDto) {
    return `This action updates a #${id} toDo`;
  }

  remove(id: number) {
    return `This action removes a #${id} toDo`;
  }
}
