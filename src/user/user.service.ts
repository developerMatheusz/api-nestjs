import {
  BadRequestException,
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { UserEntity } from "src/entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) {}

  async create(data: CreateUserDTO) {
    if (
      this.usersRepository.exist({
        where: {
          email: data.email
        }
      })
    ) {
      throw new BadRequestException("Este e-mail já está sendo utilizado!");
    }
    data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());

    const user = this.usersRepository.create(data);

    return this.usersRepository.save(user);
  }

  async list() {
    return this.usersRepository.find();
  }

  async show(id: number) {
    await this.exists(id);

    return this.usersRepository.findOneBy({
      id
    });
  }

  async update(
    id: number,
    { name, email, password, birthAt, role }: UpdatePutUserDTO
  ) {
    await this.exists(id);

    password = await bcrypt.hash(password, await bcrypt.genSalt());

    await this.usersRepository.update(id, {
      name,
      email,
      password,
      birthAt: birthAt ? new Date(birthAt) : null,
      role
    });

    return this.show(id);
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

    await this.usersRepository.update(id, data);

    return this.show(id);
  }

  async delete(id: number) {
    if (!(await this.show(id))) {
      throw new NotFoundException(`O usuário ${id} não existe.`);
    }

    return this.usersRepository.delete(id);
  }

  async exists(id: number) {
    if (
      await this.usersRepository.exist({
        where: {
          id
        }
      })
    ) {
      throw new NotFoundException(`O usuário ${id} não existe`);
    }
  }
}
