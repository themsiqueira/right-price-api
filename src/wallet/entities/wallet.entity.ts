import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class WalletEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  // criar a relation - cardinalidade - 1:1
  userId: string

  // criar a relation - cardinalidade - N:N
  couponsIds: string[]

  deletedAt: Date

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  expiresAt: Date
}
