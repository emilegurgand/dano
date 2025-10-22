import { Module } from '@nestjs/common';
import { WordService } from './word.service';
import { WordController } from './word.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/users.entity';
import { Word } from './word.entity';

@Module({
  providers: [WordService],
  controllers: [WordController],
  imports: [TypeOrmModule.forFeature([Word])],
})
export class WordModule {}
