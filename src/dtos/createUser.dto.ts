import {
  IsDefined,
  IsEmail,
  IsIn,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength
} from "class-validator";
import { Role } from "../enums/role.enum";

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  fullname: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsPhoneNumber()
  @IsOptional()
  phoneNum: string;

  @IsString()
  @IsIn([Role.ADMIN, Role.DOCTOR, Role.PATIENT])
  role: string;
}