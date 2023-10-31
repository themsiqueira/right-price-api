import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, Relation, OneToMany } from 'typeorm'

import { PromotionEntity } from '@app/product/entities/promotion.entity'

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  isDeleted: boolean

  @Column()
  deletedAt: Date

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @OneToMany(() => PromotionEntity, (promotion) => promotion.id)
  promotions: Relation<PromotionEntity>[]
}
