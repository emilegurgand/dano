export class SignInDto {
  nickname: string;
  password: string;
}
export class JwtPayloadDto {
  sub: string;
  nickname: string;
  iat: number;
  exp: number;
}
