import { Body, Controller, Post } from "@nestjs/common";
import { User } from "@prisma/client";
import { AuthService } from "./auth.service";
import { RegisterUserDto } from "@/users/users.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  async registerUser(@Body() body: RegisterUserDto): Promise<User> {
    return this.authService.registerUser(body);
  }
}
