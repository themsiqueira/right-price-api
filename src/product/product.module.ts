import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SharedModule } from '@app/shared/shared.module'
import { ProductEntity } from '@app/product/entities/product.entity'
import { PromotionEntity } from '@app/product/entities/promotion.entity'
import { CreateProduct } from '@app/product/usecases/create-product'
import { DeleteProduct } from '@app/product/usecases/delete-product'
import { CreatePromotion } from '@app/product/usecases/create-promotion'
import { GetProduct } from '@app/product/usecases/get-product'
import { GetPromotion } from '@app/product/usecases/get-promotion'
import { ListProduct } from '@app/product/usecases/list-product'
import { ListPromotion } from '@app/product/usecases/list-promotion'
import { UpdateProduct } from '@app/product/usecases/update-product'
import { UpdatePromotion } from '@app/product/usecases/update-promotion'
import { UploadPromotion } from '@app/product/usecases/upload-promotion'

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([ProductEntity, PromotionEntity])],
  providers: [
    CreateProduct,
    DeleteProduct,
    CreatePromotion,
    GetProduct,
    GetPromotion,
    ListProduct,
    ListPromotion,
    UpdateProduct,
    UpdatePromotion,
    UploadPromotion
  ],
  exports: [
    CreateProduct,
    DeleteProduct,
    CreatePromotion,
    GetProduct,
    GetPromotion,
    ListProduct,
    ListPromotion,
    UpdateProduct,
    UpdatePromotion,
    UploadPromotion
  ]
})
export class ProductModule {}
