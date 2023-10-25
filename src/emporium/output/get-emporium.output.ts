export class GetEmporiumOutput {
    id: number;
    name: string; 
    address: string;
    createdAt: Date;
    expiresAt: Date;
    isDeleted: boolean;

    constructor(id: number, name: string, address: string, createdAt: Date, expiresAt: Date, isDeleted: boolean) {
      this.id = id;
      this.name = name;
      this.address = address;
      this.createdAt = createdAt;
      this.expiresAt = expiresAt;
      this.isDeleted = isDeleted;
    }
  }
  