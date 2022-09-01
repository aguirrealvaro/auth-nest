import { Controller, Delete, Get, Param, ParseIntPipe, UseGuards } from "@nestjs/common";
import { User as UsersModel } from "@prisma/client";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "@/auth/jwt.guard";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<UsersModel[]> {
    return this.usersService.findAll();
  }

  @Delete(":id")
  async delete(@Param("id", ParseIntPipe) id: number): Promise<UsersModel> {
    return this.usersService.delete(id);
  }
}
