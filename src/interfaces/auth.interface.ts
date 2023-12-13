import { UserDto } from "../dtos/user.dto";

export interface IAuthService {
  checkCredentials(email: string, password: string): Promise<UserDto>;
}

export const IAuthService = Symbol("AuthService");