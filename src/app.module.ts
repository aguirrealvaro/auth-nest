import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { ConfigurationModule } from "./config/config.module";

@Module({
  imports: [ConfigurationModule, AuthModule],
})
export class AppModule {}
