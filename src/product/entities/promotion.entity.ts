import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, OneToOne, JoinColumn, Relation } from 'typeorm'

import { ProductEntity } from '@app/product/entities/product.entity'
import { EmporiumEntity } from '@app/emporium/entities/emporium.entity'
import { UserEntity } from '@app/user/entities/user.entity'

@Entity()
export class PromotionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToMany(() => ProductEntity, (product) => product.id)
  products: Relation<ProductEntity>[]

  @OneToOne(() => EmporiumEntity)
  @JoinColumn({ name: 'emporiumId' })
  emporiumId: Relation<EmporiumEntity>

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'Reporter_userId' })
  user: Relation<UserEntity>

  @Column()
  price: number

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  expiresAt: Date

  @Column()
  isDeleted: boolean
}
