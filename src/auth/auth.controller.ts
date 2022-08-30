import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterUserDto } from "@/users/users.dto";
import { UsersEntity } from "@/users/users.entity";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  async registerUser(@Body() body: RegisterUserDto): Promise<UsersEntity> {
    return this.authService.registerUser(body);
  }
}
