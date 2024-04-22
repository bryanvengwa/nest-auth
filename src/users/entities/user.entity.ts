import { Column, Entity } from 'typeorm';

@Entity()
export class User {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  userName: string;

  @Column()
  password: string;

  @Column({nullable: true})
  refreshToken: string;
}
