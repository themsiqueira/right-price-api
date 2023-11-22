import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, Relation } from 'typeorm'

import { EmporiumEntity } from '@app/emporium/entities/emporium.entity'

@Entity()
export class CouponEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  code: string

  @OneToOne(() => EmporiumEntity)
  @JoinColumn({ name: 'couponId' })
  emporium: Relation<EmporiumEntity>

  @Column()
  quantity: number

  @Column({ nullable: true })
  deletedAt: Date

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  expiresAt: Date
}
