import { Body, Controller, Post, HttpCode, HttpStatus, Inject } from '@nestjs/common';

import { UserDto } from 'src/dtos/user.dto';
import { LoginDto } from 'src/dtos/login.dto';
import { IAuthService } from 'src/interfaces/auth.interface';
import { InfoMessage } from 'src/dtos/_infoMessage.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(IAuthService)
    private authService: IAuthService
    ) { }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async checkCredentials(@Body() signInDto: LoginDto): Promise<InfoMessage<UserDto>> {
    const userDto: UserDto = await this.authService.checkCredentials(signInDto.email, signInDto.password);
    return {
      message: "User credentials are correct",
      data: userDto,
    }
  }
}