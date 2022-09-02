import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User as UserModel } from "@prisma/client";
import { genSalt, compare, hash } from "bcryptjs";
import { JWTPayload } from "./auth.types";
import { PrismaService } from "@/database/prisma.service";
import { LoginUserDto, RegisterUserDto } from "@/users/users.dto";
@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService, private jwtService: JwtService) {}

  async register(body: RegisterUserDto): Promise<UserModel> {
    const { email, password, confirmPassword } = body;

    const user = await this.prismaService.user.findUnique({ where: { email } });

    if (user) {
      throw new ConflictException("Email alredy exists");
    }

    if (password !== confirmPassword) {
      throw new BadRequestException("Password not matching");
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const newUser = this.prismaService.user.create({
      data: { email, password: hashedPassword },
    });

    return newUser;
  }

  async login(body: LoginUserDto) {
    const { email, password } = body;

    const user = await this.prismaService.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException("Email not found");
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException("Password invalid");
    }

    const payload: JWTPayload = {
      id: user.id,
    };

    const token = this.jwtService.sign(payload);
    // jwtService sets the token to the Authorization header automatically

    return {
      success: true,
      token,
      user: payload,
    };
  }
}
