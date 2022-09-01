import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWTPayload } from "./auth.types";
import { PrismaService } from "@/database/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "secret321",
    });
  }

  async validate(payload: JWTPayload) {
    const currentUser = await this.prismaService.user.findUnique({
      where: { id: payload.id },
    });

    return currentUser;
  }
}
