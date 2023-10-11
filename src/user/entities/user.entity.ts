import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  // criar a relation - cardinalidade - 1:1
  personId: string

  @Column()
  email: string

  passwordHash: string

  deletedAt: Date

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  expiresAt: Date
}
