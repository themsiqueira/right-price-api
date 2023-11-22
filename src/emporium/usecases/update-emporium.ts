import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectEntityManager } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { plainToClass } from 'class-transformer'

import { EmporiumEntity } from '@app/emporium/entities/emporium.entity'
import { UpdateEmporiumInput } from '@app/emporium/input/update-emporium.input'
import { UpdateEmporiumOutput } from '@app/emporium/output/update-emporium.output'
import { ValidateService } from '@app/shared/services/validate.service'

@Injectable()
export class UpdateEmporium {
  private readonly emporiumRepository: Repository<EmporiumEntity>
  constructor(
    @InjectEntityManager() private readonly dataSource: DataSource,
    private readonly validateService: ValidateService
  ) {
    this.emporiumRepository = this.dataSource.getRepository(EmporiumEntity)
  }

  async handle(input: UpdateEmporiumInput): Promise<UpdateEmporiumOutput> {
    const inputValidated = await this.validateService.validateAndTransformInput(UpdateEmporiumInput, input)
    const emporium = await this.emporiumRepository.findOne({ where: { id: inputValidated.id } })

    if (!emporium) {
      throw new NotFoundException('Emporium not found')
    }

    if (inputValidated.name) {
      emporium.name = inputValidated.name
    }

    if (inputValidated.address) {
      emporium.address = inputValidated.address
    }

    await this.emporiumRepository.save(emporium)

    return plainToClass(UpdateEmporiumOutput, emporium)
  }
}
