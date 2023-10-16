import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm'

import { UserEntity } from '@app/user/entities/user.entity'

@Entity()
export class EmporiumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  // verificar de separar address em street, number, complement, city, state, country, zipcode
  @Column()
  address: string

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  userId?: UserEntity

  @Column()
  deletedAt: Date

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  expiresAt: Date
}
