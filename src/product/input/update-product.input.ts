import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { Relation } from "typeorm";
import { PromotionEntity } from "../entities/promotion.entity";
import { Type } from "class-transformer";

export class UpdateProductInput {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsString()
    name: string;

    @Type(() => PromotionEntity)
    promotion: PromotionEntity;

    @IsDate()
    expiresAt: Date;

}
