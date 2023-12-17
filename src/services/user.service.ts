import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { CreateUserDto } from '../dtos/createUser.dto';
import { UserDto } from '../dtos/user.dto';
import { UserEntity } from '../entities/user.entity';
import { IUserService } from '../interfaces/user.interface';

@Injectable()
export class UserService implements IUserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) { }

  async findById(userId: string): Promise<UserDto> {
    this.logger.log("findById");
    this.logger.debug(`userId: ${userId}`);
    const userEntity = await this.userRepository.findOneBy({ userId });
    if (!userEntity) {
      throw new NotFoundException("User not found");
    }

    return new UserDto(userEntity);
  };

  async findByEmail(email: string): Promise<UserDto> {
    this.logger.log("findByEmail");
    const userEntity = await this.userRepository.findOneBy({ email });
    if (!userEntity) {
      throw new NotFoundException("User not found");
    }

    return new UserDto(userEntity);
  };

  async findAll(): Promise<UserDto[]> {
    this.logger.log("findAll");
    const userEntities = await this.userRepository.find();
    return userEntities.map(userEntity => new UserDto(userEntity));
  };

  async createUser(userData: CreateUserDto): Promise<UserDto> {
    this.logger.log("createUser");
    const userEmail = await this.userRepository.findOneBy({ email: userData.email });
    if (userEmail) {
      throw new ConflictException("User already exists");
    }

    const salt = bcrypt.genSaltSync();
    const passwordHash = bcrypt.hashSync(userData.password, salt);

    const newUser: UserEntity = {...userData, password: passwordHash};
    const createdUser = await this.userRepository.save(newUser);

    return new UserDto(createdUser);
  };

  async updateUser(userId: string, userData: Partial<CreateUserDto>): Promise<UserDto> {
    this.logger.log("updateUser");
    const userEntity = await this.userRepository.findOneBy({ userId });
    if (!userEntity) {
      throw new NotFoundException("User not found");
    }

    if (userData.password) {
      const salt = bcrypt.genSaltSync();
      userData.password = bcrypt.hashSync(userData.password, salt);
    }

    const userUpdateData: UserEntity = {...userEntity, ...userData};

    const updatedUser = await this.userRepository.save(userUpdateData);
    return new UserDto(updatedUser);
  };

  async deleteUser(userId: string): Promise<void> {
    this.logger.log("deleteUser");
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    await this.userRepository.delete({ userId: user.userId });
  };
}
