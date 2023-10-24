import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SharedModule } from '@app/shared/shared.module'
import { ProductEntity } from '@app/product/entities/product.entity'
import { PromotionEntity } from '@app/product/entities/promotion.entity'

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([ProductEntity, PromotionEntity])],
  providers: [],
  exports: []
})
export class ProductModule {}
