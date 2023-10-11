import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class PromotionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  // criar a relation - cardinalidade - 1:N
  productId: string

  // criar a relation - cardinalidade - 1:N
  emporiumId: string

  price: number

  validity: Date

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  expiresAt: Date
}
