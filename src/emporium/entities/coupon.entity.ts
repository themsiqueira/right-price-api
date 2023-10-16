import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm'

import { EmporiumEntity } from '@app/emporium/entities/emporium.entity'

@Entity()
export class CouponEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  code: string

  @OneToOne(() => EmporiumEntity)
  @JoinColumn({ name: 'couponId' })
  emporium: EmporiumEntity

  @Column()
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
