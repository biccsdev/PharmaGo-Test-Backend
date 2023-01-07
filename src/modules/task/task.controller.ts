import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { TaskEntity } from 'src/model/task.entity';
import { CreateTaskDto } from './create-task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  //This is a constructor which takes in a private instance of the
  // TaskService class in order to access its methods
  constructor(private taskService: TaskService) {}

  //This is a decorator which is used to define a Post request handler
  @Post()
  //Method that handles a post request. It is an asynchronous function which takes in the body
  // of the request and returns a promise of type TaskEntity
  async create(@Body() body: CreateTaskDto): Promise<TaskEntity> {
    //Conditional statement which checks if the body of the request does not contain a taskName.
    if (!body.taskName) {
      //If the body is not present, it throws a BadRequestException indication that the Task name is required
      throw new BadRequestException('Task name is required.');
    }
    //Assigns the result of the asynchronous method call of the
    // this.taskService.create() method to the task variable, which is of type TaskEntity.
    const task: TaskEntity = await this.taskService.create(body.taskName);
    return task;
  }

  //This is a method which handles a Get request. It is an asynchronous
  // function which returns a promise of an array of TaskEntity objects.
  // If an error is encountered, it throws an InternalServerErrorException.
  @Get()
  async listAll(): Promise<TaskEntity[]> {
    try {
      const tasks: TaskEntity[] = await this.taskService.findAll();
      return tasks;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
