import { Injectable } from "@nestjs/common";
import { User as UsersModel } from "@prisma/client";
import { PrismaService } from "@/database/prisma.service";

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findAll(): Promise<UsersModel[]> {
    return this.prismaService.user.findMany();
  }
}
