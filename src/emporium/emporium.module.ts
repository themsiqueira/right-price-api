import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SharedModule } from '@app/shared/shared.module'
import { CreateEmporium } from '@app/emporium/usecases/create-emporium'
import { EmporiumEntity } from '@app/emporium/entities/emporium.entity'
import { CouponEntity } from '@app/emporium/entities/coupon.entity'
import { DeleteEmporium } from '@app/emporium/usecases/delete-emporium'
import { GetEmporium } from '@app/emporium/usecases/get-emporium'
import { ListEmporium } from '@app/emporium/usecases/list-emporium'
import { UpdateEmporium } from '@app/emporium/usecases/update-emporium'

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([EmporiumEntity, CouponEntity])],
  providers: [CreateEmporium, DeleteEmporium, GetEmporium, ListEmporium, UpdateEmporium],
  exports: [CreateEmporium, DeleteEmporium, GetEmporium, ListEmporium, UpdateEmporium]
})
export class EmporiumModule {}
