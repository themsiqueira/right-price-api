import { UserEntity } from "@app/user/entities/user.entity";

export class GetEmporiumOutput {
    id: string;
    name: string; 
    address: string;
    userId: UserEntity;
    createdAt: Date;
    expiresAt: Date;
    isDeleted: boolean;

    constructor(id: string, name: string, address: string, userId: UserEntity, createdAt: Date, expiresAt: Date, isDeleted: boolean) {
      this.id = id;
      this.name = name;
      this.address = address;
      this.userId = userId;
      this.createdAt = createdAt;
      this.expiresAt = expiresAt;
      this.isDeleted = isDeleted;
    }
  }
  