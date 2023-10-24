import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'

import { ValidateService } from '@app/shared/services/validate.service'
import { EmporiumEntity } from '@app/emporium/entities/emporium.entity'
import { CreateEmporiumInput } from '@app/emporium/input/create-emporium.input'
import { CreateEmporiumOutput } from '@app/emporium/output/create-emporium.output'

@Injectable()
export class CreateEmporium {
  constructor(
    @InjectRepository(EmporiumEntity) private readonly emporiumRepository: Repository<EmporiumEntity>,
    private readonly validateService: ValidateService
  ) {}

  async handle(input: CreateEmporiumInput): Promise<CreateEmporiumOutput> {
    const inputValidated = await this.validateService.validateAndTransformInput(CreateEmporiumInput, input)
    const emporium = await this.emporiumRepository.save(this.emporiumRepository.create(inputValidated))
    return this.mapOutput(emporium)
  }

  private mapOutput(emporium: EmporiumEntity): CreateEmporiumOutput {
    return Object.assign(new CreateEmporiumOutput(), emporium)
  }
}
