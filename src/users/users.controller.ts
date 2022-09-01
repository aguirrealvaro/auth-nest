import { Controller, Delete, Get, Param, ParseIntPipe, UseGuards } from "@nestjs/common";
import { User as UsersModel } from "@prisma/client";
import { UsersService } from "./users.service";
import { JTWAuthGuard } from "@/auth/jwt.guard";

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
  @UseGuards(JTWAuthGuard)
  // ideally, i set the guard globally, having a @Public decorator
  // https://docs.nestjs.com/security/authentication#enable-authentication-globally
  async getCurrent() {
    return this.usersService.getCurrent();
  }
}
