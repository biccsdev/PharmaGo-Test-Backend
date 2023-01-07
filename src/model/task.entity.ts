import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity({ name: 'task' })
export class TaskEntity {
  // Creates a primary column which value will be automatically generated with uuid.
  // Uuid is a unique string id, value will be automatically generated.
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'varchar' })
  taskName: string;
}
