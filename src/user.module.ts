import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { IUserService } from "src/interfaces/user.interface";
import { dataSource } from "./config/dataSource";
import { UserController } from "./controllers/user.controller";
import { UserEntity } from "./entities/user.entity";
import { IAuthService } from "./interfaces/auth.interface";
import { AuthService } from "./services/auth.service";
import { UserService } from "./services/user.service";

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSource),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: IUserService,
      useClass: UserService
    },
    {
      provide: IAuthService,
      useClass: AuthService
    },
  ],
})
export class UserModule { }
