import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from '../../model/task.entity';
import { Repository } from 'typeorm';

//This decorator makes the class injectable for the module
@Injectable()
export class TaskService {
  //Create a private readonly property that holds a repo of TaskEntity to be used for DB connection
  constructor(
    @InjectRepository(TaskEntity) private readonly repo: Repository<TaskEntity>,
  ) {}

  //This is a method which creates a new TaskEntity object and saves it to the repository.
  // It takes in a string as an argument which is the taskName and returns a promise of the TaskEntity object which is created.
  public async create(taskName: string): Promise<TaskEntity> {
    const taskModel: TaskEntity = {
      taskName: taskName,
    };
    const task = this.repo.save(taskModel);
    return task;
  }

  //Finds all the TaskEntity objects in the repository and returns them as an array.
  // It returns a promise of an array of TaskEntity objects.
  public async findAll(): Promise<TaskEntity[]> {
    const tasks = this.repo.find();
    return tasks;
  }
}
