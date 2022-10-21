import { Controller, Delete, Get, Param, ParseIntPipe, UseGuards } from "@nestjs/common";
import { User as UsersModel } from "@prisma/client";
import { UsersService } from "./users.service";
import { EmailAvailabilityReturn } from "./users.types";
import { JWTAuthGuard } from "@/auth/jwt.guard";
import { EmailPipe } from "@/pipes/email.pipe";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAll(): Promise<UsersModel[]> {
    return this.usersService.getAll();
  }

  @Delete(":id")
  async delete(@Param("id", ParseIntPipe) id: number): Promise<UsersModel> {
    return this.usersService.delete(id);
  }

  @Get("current")
  @UseGuards(JWTAuthGuard)
  // ideally, i set the guard globally, having a @Public decorator
  // https://docs.nestjs.com/security/authentication#enable-authentication-globally
  async getCurrent() {
    return this.usersService.getCurrent();
  }

  @Get("email_availability/:email")
  async getEmailAvailability(
    @Param("email", EmailPipe) email: string
  ): Promise<EmailAvailabilityReturn> {
    return this.usersService.getEmailAvailability(email);
  }
}
