import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { ConfigurationModule } from "./config/config.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [ConfigurationModule, AuthModule, UsersModule],
})
export class AppModule {}
