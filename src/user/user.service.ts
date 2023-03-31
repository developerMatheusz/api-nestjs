import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDTO) {
    data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());

    return this.prisma.user.create({
      data
    });
  }

  async list() {
    return this.prisma.user.findMany();
  }

  async show(id: number) {
    await this.exists(id);

    return this.prisma.user.findUnique({
      where: {
        id
      }
    });
  }

  async update(
    id: number,
    { name, email, password, birthAt, role }: UpdatePutUserDTO
  ) {
    await this.exists(id);

    password = await bcrypt.hash(password, await bcrypt.genSalt());

    return this.prisma.user.update({
      data: {
        name,
        email,
        password,
        birthAt: birthAt ? new Date(birthAt) : null,
        role
      },
      where: {
        id
      }
    });
  }

  async updatePartial(
    id: number,
    { name, email, password, birthAt, role }: UpdatePatchUserDTO
  ) {
    const data: any = {};

    if (birthAt) {
      data.birthAt = new Date(birthAt);
    }

    if (email) {
      data.email = email;
    }

    if (name) {
      data.name = name;
    }

    if (password) {
      data.password = await bcrypt.hash(password, await bcrypt.genSalt());
    }

    if (role) {
      data.role = role;
    }

    return this.prisma.user.update({
      data,
      where: {
        id
      }
    });
  }

  async delete(id: number) {
    if (!(await this.show(id))) {
      throw new NotFoundException(`O usuário ${id} não existe.`);
    }

    return this.prisma.user.delete({
      where: {
        id
      }
    });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.user.count({
        where: {
          id
        }
      }))
    ) {
      throw new NotFoundException(`O usuário ${id} não existe`);
    }
  }
}
