import { CreateUserDto } from "../dtos/createUser.dto";
import { UserDto } from "../dtos/user.dto";

export interface IUserService {
  findAll(): Promise<UserDto[]>;
  findById(userId: string): Promise<UserDto>;
  findByEmail(email: string): Promise<UserDto>;
  createUser(userData: CreateUserDto): Promise<UserDto>;
  updateUser(userId: string, userData: Partial<CreateUserDto>): Promise<UserDto>;
  deleteUser(userId: string): Promise<void>;
}

export const IUserService = Symbol("UserService");