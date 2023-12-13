import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EurekaModule } from "nestjs-eureka";

import { IUserService } from "src/interfaces/user.interface";
import { dataSource } from "./config/dataSource";
import { eurekaConfig } from "./config/eureka";
import { UserController } from "./controllers/user.controller";
import { UserEntity } from "./entities/user.entity";
import { UserService } from "./services/user.service";
import { AuthController } from "./controllers/auth.controller";
import { IAuthService } from "./interfaces/auth.interface";
import { AuthService } from "./services/auth.service";

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSource),
    EurekaModule.forRoot(eurekaConfig),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UserController, AuthController],
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
