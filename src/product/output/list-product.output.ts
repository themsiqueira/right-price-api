import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ListProductOutput {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
}
