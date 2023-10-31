import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SharedModule } from '@app/shared/shared.module'
import { CreateEmporium } from '@app/emporium/usecases/create-emporium'
import { EmporiumEntity } from '@app/emporium/entities/emporium.entity'
import { CouponEntity } from '@app/emporium/entities/coupon.entity'

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([EmporiumEntity, CouponEntity])],
  providers: [CreateEmporium],
  exports: [CreateEmporium]
})
export class EmporiumModule {}
