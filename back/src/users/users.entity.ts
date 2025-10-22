import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Word } from '../word/word.entity';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ unique: true })
  nickname: string;

  @Column()
  password: string;

  @OneToMany(() => Users, (user) => user.words)
  words: Word[];
}
