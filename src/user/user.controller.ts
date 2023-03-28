import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Patch,
  Delete
} from "@nestjs/common";
import { ParamId } from "src/decorators/param-id.decorator";
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
  async show(@ParamId() id: number) {
    console.log({ id });
    return this.userService.show(id);
  }

  @Put(":id")
  async update(
    @Body() { name, email, password, birthAt }: UpdatePutUserDTO,
    @ParamId() id
  ) {
    return this.userService.update(id, { name, email, password, birthAt });
  }

  @Patch(":id")
  async updatePartial(
    @Body() { name, email, password }: UpdatePatchUserDTO,
    @ParamId() id
  ) {
    return this.userService.updatePartial(id, { name, email, password });
  }

  @Delete(":id")
  async delete(@ParamId() id) {
    return this.userService.delete(id);
  }
}
