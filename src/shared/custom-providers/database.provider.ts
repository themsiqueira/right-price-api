import { ConfigService } from '@nestjs/config'
import { DataSource } from 'typeorm'

export const databaseProviders = [
  {
    provide: DataSource,
    useFactory: async (configService: ConfigService): Promise<DataSource> => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: configService.get('DB_HOST') || 'localhost',
        port: configService.get('DB_PORT') || 5432,
        username: configService.get('DB_USER') || 'precocerto',
        password: configService.get('DB_PASSWORD') || 'precocerto',
        database: configService.get('DB_NAME') || 'preco-certo-database',
        entities: [__dirname + '/../../**/entities/*.entity{.ts,.js}'],
        synchronize: true
      })

      return dataSource.initialize()
    },
    inject: [ConfigService]
  }
]
