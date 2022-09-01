import { Controller, Delete, Get, Param, ParseIntPipe, Req, UseGuards } from "@nestjs/common";
import { User as UsersModel } from "@prisma/client";
import { Request } from "express";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "@/auth/jwt.guard";

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
  @UseGuards(JwtAuthGuard)
  async getCurrent(@Req() req: Request) {
    console.log(req.user);
    return this.usersService.getCurrent();
  }
}
