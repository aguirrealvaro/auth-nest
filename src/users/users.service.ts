import { Injectable, NotFoundException } from "@nestjs/common";
import { User as UsersModel } from "@prisma/client";
import { PrismaService } from "@/database/prisma.service";

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async getAll(): Promise<UsersModel[]> {
    const users = await this.prismaService.user.findMany();
    return users;
  }

  async delete(id: number): Promise<UsersModel> {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const deletedUser = await this.prismaService.user.delete({ where: { id: user.id } });
    return deletedUser;
  }

  async getCurrent() {
    return "asd";
  }
}
