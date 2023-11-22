import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity()
export class PersonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  documentNumber: string

  @Column()
  birthDate: Date

  @Column({ nullable: true })
  deletedAt: Date

  @Column()
  @CreateDateColumn()
  createdAt: Date
}
