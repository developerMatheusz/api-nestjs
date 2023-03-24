import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Patch,
  Delete,
  ParseIntPipe
} from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UserService } from "./user.service";

@Controller("/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() { name, email, password, birthAt }: CreateUserDTO) {
    return this.userService.create({ name, email, password, birthAt });
  }

  @Get()
  async list() {
    return this.userService.list();
  }

  @Get(":id")
  async show(@Param("id", ParseIntPipe) id: number) {
    return this.userService.show(id);
  }

  @Put(":id")
  async update(
    @Body() { name, email, password, birthAt }: UpdatePutUserDTO,
    @Param("id", ParseIntPipe) id
  ) {
    return this.userService.update(id, { name, email, password, birthAt });
  }

  @Patch(":id")
  async updatePartial(
    @Body() { name, email, password }: UpdatePatchUserDTO,
    @Param("id", ParseIntPipe) id
  ) {
    return this.userService.updatePartial(id, { name, email, password });
  }

  @Delete(":id")
  async delete(@Param("id", ParseIntPipe) id) {
    return this.userService.delete(id);
  }
}
