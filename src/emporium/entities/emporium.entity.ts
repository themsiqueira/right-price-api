import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class EmporiumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  // verificar de separar address em street, number, complement, city, state, country, zipcode
  @Column()
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
