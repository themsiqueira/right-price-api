import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  documentNumber: string

  @Column()
  birthDate: Date

  @Column()
  deletedAt: Date

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  expiresAt: Date
}
