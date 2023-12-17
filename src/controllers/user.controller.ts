import {
  Body,
  Controller,
  Delete,
  Get, HttpCode, HttpStatus, Inject, Param, Post, Put, Req
} from "@nestjs/common";
import { Request } from 'express'

import { IUserService } from "src/interfaces/user.interface";
import { InfoMessage } from "../dtos/_infoMessage.dto";
import { CreateUserDto } from "../dtos/createUser.dto";
import { UserDto } from "../dtos/user.dto";
import { LoginDto } from "src/dtos/login.dto";
import { IAuthService } from "src/interfaces/auth.interface";

@Controller()
export class UserController {
  constructor(
    @Inject(IUserService)
    private readonly userService: IUserService,
    @Inject(IAuthService)
    private authService: IAuthService
  ) { }

  @Get()
  async getAllUsers(): Promise<InfoMessage<UserDto[]>> {
    const users = await this.userService.findAll();
    return {
      message: "Users retrieved successfully",
      data: users,
    }
  };

  @Get("/me")
  async getMe(@Req() req: Request): Promise<InfoMessage<UserDto>> {
    const userId = req.headers['user'] as string;
    const user = await this.userService.findById(userId);
    return {
      message: "User retrieved successfully",
      data: user,
    }
  };

  @Get("/:userId")
  async getUserById(@Param('userId') userId: string): Promise<InfoMessage<UserDto>> {
    const user = await this.userService.findById(userId);
    return {
      message: "User retrieved successfully",
      data: user,
    }
  };

  @Post("/")
  async createUser(@Body() userData: CreateUserDto): Promise<InfoMessage<UserDto>> {
    const user = await this.userService.createUser(userData);
    return {
      message: "User created successfully",
      data: user,
    }
  };

  @Put("/:userId")
  async updateUser(@Param("userId") userId: string, @Body() userData: Partial<CreateUserDto>): Promise<InfoMessage<UserDto>> {
    const user = await this.userService.updateUser(userId, userData);
    return {
      message: "User updated successfully",
      data: user,
    }
  };

  @Delete("/:userId")
  async deleteUser(@Param("userId") userId: string): Promise<InfoMessage<void>> {
    await this.userService.deleteUser(userId);
    return {
      message: "User deleted successfully",
    }
  };

  @Post('check')
  @HttpCode(HttpStatus.OK)
  async checkCredentials(@Body() signInDto: LoginDto): Promise<InfoMessage<UserDto>> {
    const userDto: UserDto = await this.authService.checkCredentials(signInDto.email, signInDto.password);
    return {
      message: "User credentials are correct",
      data: userDto,
    }
  }
}
