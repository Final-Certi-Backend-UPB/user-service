import {
  Body,
  Controller,
  Delete,
  Get, Inject, Param, Post, Put
} from "@nestjs/common";

import { IUserService } from "src/interfaces/user.interface";
import { InfoMessage } from "../dtos/_infoMessage.dto";
import { CreateUserDto } from "../dtos/createUser.dto";
import { UserDto } from "../dtos/user.dto";

@Controller('users')
export class UserController {
  constructor(
    @Inject(IUserService)
    private readonly userService: IUserService
  ) { }
  @Get()
  async getAllUsers(): Promise<InfoMessage<UserDto[]>> {
    const users = await this.userService.findAll();
    return {
      message: "Users retrieved successfully",
      data: users,
    }
  };

  @Get("/:userId")
  async getUserById(@Param() userId): Promise<InfoMessage<UserDto>> {
    const user = await this.userService.findById(userId);
    return {
      message: "User retrieved successfully",
      data: user,
    }
  };

  @Post()
  async createUser(@Body() userData: CreateUserDto): Promise<InfoMessage<UserDto>> {
    const user = await this.userService.createUser(userData);
    return {
      message: "User created successfully",
      data: user,
    }
  };

  @Put("/:userId")
  async updateUser(@Param() userId, @Body() userData: Partial<CreateUserDto>): Promise<InfoMessage<UserDto>> {
    const user = await this.userService.updateUser(userId, userData);
    return {
      message: "User updated successfully",
      data: user,
    }
  };

  @Delete("/:userId")
  async deleteUser(@Param() userId): Promise<InfoMessage<void>> {
    await this.userService.deleteUser(userId);
    return {
      message: "User deleted successfully",
    }
  };
}
