import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm'

import { PromotionEntity } from '@app/product/entities/promotion.entity'

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  // verificar category

  @Column()
  deletedAt: Date

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @ManyToOne(() => PromotionEntity, (promotion) => promotion.products)
  promotion: PromotionEntity

  @Column()
  expiresAt: Date
}