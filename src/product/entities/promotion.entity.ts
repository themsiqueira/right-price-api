import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm'
import { ProductEntity } from './product.entity'
import { EmporiumEntity } from '@app/emporium/entities/emporium.entity'
import { UserEntity } from '@app/user/entities/user.entity'

@Entity()
export class PromotionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToMany(() => ProductEntity, (product) => product.id)
  products: ProductEntity[]

  @OneToOne(() => EmporiumEntity)
  @JoinColumn({ name: 'emporiumId' })
  emporiumId: EmporiumEntity

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity
  @Column()
  price: number

  @Column()
  validity: Date

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  expiresAt: Date
}
