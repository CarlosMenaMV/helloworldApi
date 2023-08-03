import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { ConfigService } from "./config/config.service";

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
