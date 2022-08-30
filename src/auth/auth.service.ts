import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { User as UserModel } from "@prisma/client";
import { genSalt, compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaService } from "@/database/prisma.service";
import { LoginUserDto, RegisterUserDto } from "@/users/users.dto";

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async register(body: RegisterUserDto): Promise<UserModel> {
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

  async login(res: Response, body: LoginUserDto): Promise<UserModel> {
    const { email, password } = body;

    const user = await this.prismaService.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException("Email not found");
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      throw new BadRequestException("Email not found");
    }

    console.log(isMatch);

    /*  const payload = {
      id: user.id,
    };

    try {
      const token = await jwt.sign(payload, process.env.SECRET_TOKEN);
      res.headers.set("auth-token", token);

      return res.status(200).json({
        success: true,
        token,
        user: payload,
      });
    } catch (err) {
      throw new UnauthorizedException();
    } */

    return user;
  }
}

/*

 const loginUser = async () => {
    const { error, isValid } = loginValidator(req.body);

    if (!isValid) {
      return res.status(400).json({ error });
    }

    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(400).json({ error: "wrong credentials" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "wrong credentials" });
    }

    const payload: string = user.id;

    try {
      const token = await jwt.sign(payload, process.env.SECRET_TOKEN);
      res.setHeader("auth-token", token);

      return res.status(200).json({
        success: true,
        token,
        user: payload,
      });
    } catch (err) {
      return res.status(400).json({ error: "failed to sign token" });
    }
  };
  */
