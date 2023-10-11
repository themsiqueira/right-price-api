import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  // verificar category

  @Column()
  deletedAt: Date

  @Column()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  expiresAt: Date
}
