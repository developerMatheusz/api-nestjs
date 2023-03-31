import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Patch,
  Delete,
  UseInterceptors,
  UseGuards
} from "@nestjs/common";
import { ParamId } from "src/decorators/param-id.decorator";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UserService } from "./user.service";
import { Roles } from "src/decorators/role.decorator";
import { Role } from "src/enums/role.enum";
import { LogInterceptor } from "src/interceptors/log.interceptor";
import { RoleGuard } from "src/guards/role.guard";
import { AuthGuard } from "src/guards/auth.guard";

@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller("/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
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
    @Body() { name, email, password, birthAt, role }: UpdatePutUserDTO,
    @ParamId() id
  ) {
    return this.userService.update(id, {
      name,
      email,
      password,
      birthAt,
      role
    });
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
