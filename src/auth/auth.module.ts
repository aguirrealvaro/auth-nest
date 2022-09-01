import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { PrismaService } from "@/database/prisma.service";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>("JWT_SECRET"),
          //signOptions: { expiresIn: "60s" },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [PrismaService, AuthService, JwtStrategy],
})
export class AuthModule {}
