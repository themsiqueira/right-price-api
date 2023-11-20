import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RestModule } from '@app/rest/rest.module'
import { WalletEntity } from './wallet/entities/wallet.entity'
import { PersonEntity } from './user/entities/person.entity'
import { UserEntity } from './user/entities/user.entity'
import { EmporiumEntity } from './emporium/entities/emporium.entity'
import { CouponEntity } from './emporium/entities/coupon.entity'
import { ProductEntity } from './product/entities/product.entity'
import { PromotionEntity } from './product/entities/promotion.entity'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST') || 'localhost',
        port: config.get('DB_PORT') || 5432,
        username: config.get('DB_USER') || 'precocerto',
        password: config.get('DB_PASSWORD') || 'precocerto',
        database: config.get('DB_NAME') || 'preco-certo-database',
        entities: [WalletEntity, PersonEntity, UserEntity, EmporiumEntity, CouponEntity, ProductEntity, PromotionEntity],
        synchronize: true
      }),
      inject: [ConfigService]
    }),
    RestModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
