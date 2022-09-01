import { Body, Controller, Post } from "@nestjs/common";
import { User } from "@prisma/client";
import { AuthService } from "./auth.service";
import { LoginUserDto, RegisterUserDto } from "@/users/users.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  async register(@Body() body: RegisterUserDto): Promise<User> {
    return this.authService.register(body);
  }

  @Post("login")
  async login(@Body() body: LoginUserDto) {
    return this.authService.login(body);
  }
}
