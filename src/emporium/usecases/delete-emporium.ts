import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectEntityManager } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'

import { DeleteEmporiumInput } from '@app/emporium/input/delete-emporium.input'
import { EmporiumEntity } from '@app/emporium/entities/emporium.entity'
import { ValidateService } from '@app/shared/services/validate.service'

@Injectable()
export class DeleteEmporium {
  private readonly emporiumRepository: Repository<EmporiumEntity>
  constructor(
    @InjectEntityManager() private readonly dataSource: DataSource,
    private readonly validateService: ValidateService
  ) {
    this.emporiumRepository = this.dataSource.getRepository(EmporiumEntity)
  }

  async handle(input: DeleteEmporiumInput): Promise<void> {
    const inputValidated = await this.validateService.validateAndTransformInput(DeleteEmporiumInput, input)
    const emporium = await this.emporiumRepository.findOne({ where: { id: inputValidated.id } })
    if (!emporium) {
      throw new NotFoundException('Emporium not found')
    }

    emporium.deletedAt = new Date()
    await this.emporiumRepository.save(emporium)
  }
}
