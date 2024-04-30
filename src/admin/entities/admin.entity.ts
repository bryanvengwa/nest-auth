import { User } from 'src/users/entities/user.entity';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admins')
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;
  
  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
