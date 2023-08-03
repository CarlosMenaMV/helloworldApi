import { Controller, Get, HttpStatus } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<{ message: string; status: HttpStatus }> {
    const message = await this.appService.getHello();
    return { message, status: HttpStatus.OK };
  }
}
