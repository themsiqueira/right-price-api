import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { DeleteEmporiumInput } from '@app/emporium/input/delete-emporium.input'
import { EmporiumEntity } from '@app/emporium/entities/emporium.entity'
import { ValidateService } from '@app/shared/services/validate.service'

@Injectable()
export class DeleteEmporium {
  constructor(
    @InjectRepository(EmporiumEntity)
    private readonly emporiumRepository: Repository<EmporiumEntity>,
    private readonly validateService: ValidateService
  ) {}

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
