import { IsString } from 'class-validator';

export class CreateWordDto {
  @IsString()
  word_origin: string;

  @IsString()
  word_translate: string;

  @IsString()
  description_origin: string;

  @IsString()
  description_translate: string;
}
