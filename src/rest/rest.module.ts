import { Module } from '@nestjs/common'

import { EmporiumModule } from '@app/emporium/emporium.module'
import { HttpErrorService } from '@app/rest/service/http-error.service'
import { HealthCheckAction } from '@app/rest/healthcheck.action'
import { DocsRedocAction } from '@app/rest/redoc.action'
import { CreateEmporiumAction } from '@app/rest/emporium/create-emporium.action'
import { SharedModule } from '@app/shared/shared.module'
import { DeleteEmporiumAction } from '@app/rest/emporium/delete-emporium.action'
import { GetEmporiumAction } from '@app/rest/emporium/get-emporium.action'
import { ListEmporiumAction } from '@app/rest/emporium/list-emporium.action'
import { UpdateEmporiumAction } from '@app/rest/emporium/update-emporium.action'
import { UpdateProductAction } from '@app/rest/product/update-product.action'
import { ListProductAction } from '@app/rest/product/list-product.action'
import { GetProductAction } from '@app/rest/product/get-product.action'
import { DeleteProductAction } from '@app/rest/product/delete-product.action'
import { CreateProductAction } from '@app/rest/product/create-product.action'
import { ProductModule } from '@app/product/product.module'
import { UserModule } from '@app/user/user.module'
import { WalletModule } from '@app/wallet/wallet.module'
import { CreatePromotionAction } from '@app/rest/product/create-promotion.action'
import { GetPromotionAction } from '@app/rest/product/get-promotion.action'
import { ListPromotionAction } from '@app/rest/product/list-promotion.action'
import { UpdatePromotionAction } from '@app/rest/product/update-promotion.action'
import { UploadPromotion } from '@app/rest/product/upload-promotion.action'

@Module({
  imports: [SharedModule, EmporiumModule, ProductModule, UserModule, WalletModule],
  providers: [HttpErrorService],
  // Try to keep the alphabetical order because swagger sorts by that.
  controllers: [
    HealthCheckAction,
    DocsRedocAction,
    CreateEmporiumAction,
    DeleteEmporiumAction,
    GetEmporiumAction,
    ListEmporiumAction,
    UpdateEmporiumAction,
    CreateProductAction,
    DeleteProductAction,
    GetProductAction,
    ListProductAction,
    UpdateProductAction,
    CreatePromotionAction,
    GetPromotionAction,
    ListPromotionAction,
    UpdatePromotionAction,
    UploadPromotion
  ],
  exports: [HttpErrorService]
})
export class RestModule {}
