import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;
}
