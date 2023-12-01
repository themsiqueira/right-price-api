import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable, OneToOne, JoinColumn, Relation } from 'typeorm'

import { CouponEntity } from '@app/emporium/entities/coupon.entity'
import { UserEntity } from '@app/user/entities/user.entity'

@Entity()
export class WalletEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  userId: Relation<UserEntity>

  @ManyToMany(() => CouponEntity)
  @JoinTable()
  couponsIds: Relation<CouponEntity>[]

  @Column({ nullable: true })
  deletedAt: Date

  @Column()
  @CreateDateColumn()
  createdAt: Date
}
