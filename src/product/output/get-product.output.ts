import { Relation } from "typeorm";
import { PromotionEntity } from "../entities/promotion.entity";

export class GetProductOutput {
    id: string;
    name: string;
    promotion?: Relation<PromotionEntity>;
    createdAt: Date;
    expiresAt: Date;
    isDeleted: boolean;
    deletedAt: Date;

    constructor(id: string, name: string, promotion: Relation<PromotionEntity>, createdAt: Date, expiresAt: Date, isDeleted: boolean, deletedAt: Date) {
      this.id = id;
      this.name = name;
      this.promotion = promotion;
      this.createdAt = createdAt;
      this.expiresAt = expiresAt;
      this.isDeleted = isDeleted;
      this.deletedAt = deletedAt;
    }
}
