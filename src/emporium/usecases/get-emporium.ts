import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectEntityManager } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { plainToClass } from 'class-transformer'

import { GetEmporiumInput } from '@app/emporium/input/get-emporium.input'
import { GetEmporiumOutput } from '@app/emporium/output/get-emporium.output'
import { ValidateService } from '@app/shared/services/validate.service'
import { EmporiumEntity } from '@app/emporium/entities/emporium.entity'

@Injectable()
export class GetEmporium {
  private readonly emporiumRepository: Repository<EmporiumEntity>
  constructor(
    @InjectEntityManager() private readonly dataSource: DataSource,
    private readonly validateService: ValidateService
  ) {
    this.emporiumRepository = this.dataSource.getRepository(EmporiumEntity)
  }

  async handle(input: GetEmporiumInput): Promise<GetEmporiumOutput> {
    const inputValidated = await this.validateService.validateAndTransformInput(GetEmporiumInput, input)
    const emporium = await this.emporiumRepository.findOne({ where: { id: inputValidated.id } })

    if (!emporium) {
      throw new NotFoundException('Emporium not found')
    }

    return plainToClass(GetEmporiumOutput, emporium)
  }
}
