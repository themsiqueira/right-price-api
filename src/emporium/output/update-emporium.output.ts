import { UserEntity } from "@app/user/entities/user.entity";
import { Relation } from "typeorm";

export class UpdateEmporiumOutput {
    id: string;
    name: string;
    address: string;
    userId: Relation<UserEntity>;
    createdAt: Date;
    expiresAt: Date;
    isDeleted: boolean;

    constructor(id, name, address, userId, createdAt, expiresAt, isDeleted) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.userId = userId;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
        this.isDeleted = isDeleted;
    }
}