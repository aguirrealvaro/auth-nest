import { Inject, Injectable, NotFoundException, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { User as UsersModel } from "@prisma/client";
import { EmailAvailabilityReturn } from "./users.types";
import { PayloadRequest } from "@/auth/auth.types";
import { PrismaService } from "@/database/prisma.service";

@Injectable({ scope: Scope.REQUEST })
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    @Inject(REQUEST) private readonly request: PayloadRequest
  ) {}

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
    return this.request.user;
  }

  async getEmailAvailability(email: string): Promise<EmailAvailabilityReturn> {
    const user = await this.prismaService.user.findUnique({ where: { email } });

    return {
      available: !user,
    };
  }
}
