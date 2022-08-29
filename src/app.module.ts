import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { ConfigurationModule } from "./config/config.module";
import { DatabaseModule } from "./database/database.module";

@Module({
  imports: [ConfigurationModule, DatabaseModule, AuthModule],
})
export class AppModule {}
