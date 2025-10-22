import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Users } from '../users/users.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    nickname: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findByNickname(nickname);
    const pwdMatch = await bcrypt.compare(password, user?.password || '');
    if (!user || !pwdMatch) {
      throw new UnauthorizedException();
    }
    return {
      access_token: await this.jwtService.signAsync({
        sub: user.uuid,
        nickname: user.nickname,
      }),
    };
  }

  async signUp(nickname: string, password: string): Promise<string> {
    const existingUser = await this.usersService.findByNickname(nickname);
    if (existingUser) {
      throw new UnauthorizedException('Nickname already in use');
    }
    const user = await this.usersService.createUser(nickname, password);
    return 'successfully created user ' + user.nickname;
  }
}
