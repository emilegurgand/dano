import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Word } from './word.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWordDto } from './word.dto';
import { Users } from '../users/users.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(Word)
    private readonly wordRepository: Repository<Word>,
    private readonly usersService: UsersService,
  ) {}

  async createWord(word: CreateWordDto, userUuid: string): Promise<Word> {
    const user = await this.usersService.findByUuid(userUuid);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const newWord = this.wordRepository.create({
      ...word,
      user: user,
      date_added: new Date(),
    });
    return this.wordRepository.save(newWord);
  }
}
