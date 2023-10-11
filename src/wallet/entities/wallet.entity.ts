import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToOne, JoinColumn } from 'typeorm'
import { CouponEntity } from '@app/emporium/entities/coupon.entity'
import { UserEntity } from '@app/user/entities/user.entity'

@Entity()
export class WalletEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'userId'})
  userId: UserEntity

  @ManyToMany(() => CouponEntity)
  @JoinTable()
  couponsIds: CouponEntity[]

  @Column()
  deletedAt: Date

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  expiresAt: Date
}
