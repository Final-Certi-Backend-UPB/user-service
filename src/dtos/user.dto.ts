import { UserEntity } from "../entities/user.entity";

export class UserDto {
  userId: string;
  fullName: string;
  email: string;
  phoneNum: string;
  role: string;

  constructor(user: UserEntity) {
    this.userId = user.userId;
    this.fullName = user.fullname;
    this.email = user.email;
    this.phoneNum = user.phoneNum;
    this.role = user.role;
  }
}