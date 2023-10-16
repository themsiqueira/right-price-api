import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm'

import { PersonEntity } from '@app/user/entities/person.entity'

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToOne(() => PersonEntity)
  @JoinColumn({ name: 'personId' })
  person: PersonEntity

  @Column()
  email: string

  @Column()
  passwordHash: string

  @Column()
  deletedAt: Date

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  expiresAt: Date
}
