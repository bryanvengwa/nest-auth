import { Exclude } from 'class-transformer';
import { Admin } from 'src/admin/entities/admin.entity';
import { UserInterface } from 'src/common/interfaces/user-interface';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User implements UserInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  userName: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  phone: number;

  @Column({ nullable: true })
  refreshToken: string;

  @OneToOne(() => Admin, { cascade: true })
  @JoinColumn()
  admin: Admin;
}
