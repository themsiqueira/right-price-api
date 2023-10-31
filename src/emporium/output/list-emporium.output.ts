import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ListEmporiumOutput {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
