import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn("uuid", { name: "user_id" })
  userId?: string

  @Column({ name: "fullname" })
  fullname: string;

  @Column({ name: "email", unique: true })
  email: string;

  @Column({ name: "password" })
  password: string;

  @Column({ name: "phone_number", nullable: true })
  phoneNum: string;

  @Column({ name: "role" })
  role: string;
}