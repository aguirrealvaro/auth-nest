import { ConflictException, Injectable } from "@nestjs/common";
import { User as UserModel } from "@prisma/client";
import { genSalt, hash } from "bcryptjs";
import { PrismaService } from "@/database/prisma.service";
import { RegisterUserDto } from "@/users/users.dto";

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async registerUser(body: RegisterUserDto): Promise<UserModel> {
    const { email, password } = body;
    const user = await this.prismaService.user.findUnique({ where: { email } });

    if (user) {
      throw new ConflictException("Email alredy exists");
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const newUser = this.prismaService.user.create({
      data: { email, password: hashedPassword },
    });

    return newUser;
  }
}
