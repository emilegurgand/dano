import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsDate, IsNumber, IsString, Max, Min } from 'class-validator';
import { Users } from '../users/users.entity';

@Entity('words')
export class Word {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  word_origin: string;

  @Column()
  @IsString()
  word_translate: string;

  @Column()
  @IsString()
  description_origin: string;

  @Column()
  @IsString()
  description_translate: string;

  @Column()
  @IsDate()
  date_added: Date;

  @Column('decimal', { default: 0.5 })
  @IsNumber()
  @Min(0)
  @Max(1.0)
  difficulty: number;

  @ManyToOne(() => Users, (user) => user.words)
  user: Users;
}
