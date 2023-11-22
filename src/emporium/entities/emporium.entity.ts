import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn, Relation, UpdateDateColumn } from 'typeorm'

import { UserEntity } from '@app/user/entities/user.entity'

@Entity()
export class EmporiumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  address: string

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  userId?: Relation<UserEntity>

  @Column({ nullable: true })
  deletedAt: Date

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  @UpdateDateColumn()
  updatedAt: Date
}
