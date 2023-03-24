import { Controller, Get, Post } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller("usuarios")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("1")
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("2")
  setHello(): string {
    return "POST: Hello HCode!";
  }
}
