import { Module } from '@nestjs/common';
import { ToDoService } from './to-do.service';
import { ToDoController } from './to-do.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDo } from './entities/to-do.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ToDoController],
  providers: [ToDoService],
  imports: [
    TypeOrmModule.forFeature([ ToDo ]),
    AuthModule
  ]
})
export class ToDoModule {}
