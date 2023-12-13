import * as bcrypt from 'bcrypt'
import { InjectRepository } from "@nestjs/typeorm";
import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Repository } from "typeorm";

import { IAuthService } from "src/interfaces/auth.interface";
import { UserDto } from "../dtos/user.dto";
import { UserEntity } from "src/entities/user.entity";

export class AuthService implements IAuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) { }

  async checkCredentials(email: string, password: string): Promise<UserDto> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const authorized = bcrypt.compareSync(password, user.password);

    if (!authorized) {
      throw new UnauthorizedException("Incorrect Email or Password");
    }

    return new UserDto(user);
  }
}