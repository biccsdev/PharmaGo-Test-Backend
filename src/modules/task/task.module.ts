import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from '../../model/task.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

//This is a module class which is used to register the TaskEntity and
// TaskController classes, and to export the TaskService class.
// It imports the TypeOrmModule.forFeature() method, which is used to
// register the TaskEntity class with the type-orm module.
// The TaskService class is also registered and exported.
@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
