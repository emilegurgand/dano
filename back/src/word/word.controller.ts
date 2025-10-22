import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { WordService } from './word.service';
import { Word } from './word.entity';
import { CreateWordDto } from './word.dto';
import { Users } from '../users/users.entity';
import { AuthGuard } from '../auth/auth.guard';
import { JwtPayloadDto } from '../auth/auth.dtos';

@Controller('word')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createWord(
    @Body() createWordDTO: CreateWordDto,
    @Req() request: Request,
  ): Promise<{ message: string }> {
    const user = request['user'] as JwtPayloadDto;
    await this.wordService.createWord(createWordDTO, user.sub);
    return { message: 'created' };
  }
}
