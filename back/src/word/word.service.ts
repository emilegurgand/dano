import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Word } from './word.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWordDto } from './word.dto';
import { Users } from '../users/users.entity';

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(Word)
    private readonly wordRepository: Repository<Word>,
  ) {}

  async createWord(word: CreateWordDto, user: Users): Promise<Word> {
    const newWord = this.wordRepository.create({
      ...word,
      user: user,
      date_added: new Date(),
    });
    return this.wordRepository.save(newWord);
  }
}
