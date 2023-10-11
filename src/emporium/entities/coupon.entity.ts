import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class CouponEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  code: string

  @Column()
  emporiumId: string

  quantity: number

  @Column()
  @UpdateDateColumn()
  deletedAt: Date

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  expiresAt: Date
}
