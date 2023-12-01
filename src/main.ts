import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { useContainer } from 'class-validator'

import { AppModule } from '@app/app.module'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  app.enableCors()

  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  const config = new DocumentBuilder().setTitle('Right Price API').setDescription('SoftwareEnginner').setVersion('1.0.0').build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)
  await app.listen(3000)
}

void bootstrap()
