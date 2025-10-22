import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  @InjectRepository(Users)
  private readonly usersReposiory: Repository<Users>;

  async findByNickname(nickname: string): Promise<Users | null> {
    return this.usersReposiory.findOne({ where: { nickname } });
  }

  async findByUuid(uuid: string): Promise<Users | null> {
    return this.usersReposiory.findOne({ where: { uuid } });
  }

  async createUser(nickname: string, password: string): Promise<Users> {
    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = this.usersReposiory.create({
      nickname: nickname,
      password: hashedPwd,
      words: [],
    });
    try {
      return this.usersReposiory.save(newUser);
    } catch (error) {
      throw new BadRequestException('could not create user :', error as string);
    }
  }
}
