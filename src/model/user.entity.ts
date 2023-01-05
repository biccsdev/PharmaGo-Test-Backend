import {
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  Entity,
  Index,
  Timestamp,
} from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  // Creates a primary column which value will be automatically generated with uuid.
  // Uuid is a unique string id, value will be automatically generated.
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Index({ unique: true })
  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  // This is will automatically set the entity's insertion date
  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  accountCreation: Timestamp;

  // This will store the latest time the user was logged in, it will automatically change on object persistance
  @UpdateDateColumn()
  lastLogin: Timestamp;

  // // This variable will be used for updating the lastLogin variable, when this changes it'll update the lastLogin date
  // @Column({ type: 'boolean', default: () => false })
  // isLogged: boolean;
}
