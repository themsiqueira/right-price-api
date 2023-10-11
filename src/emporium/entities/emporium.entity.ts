import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class TokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  name: string

  // verificar de separar address em street, number, complement, city, state, country, zipcode
  address: string

  @Column()
  userId?: string

  @Column()
  deletedAt: Date

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  expiresAt: Date
}
