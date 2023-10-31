import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { plainToClass } from 'class-transformer'

import { GetEmporiumInput } from '@app/emporium/input/get-emporium.input'
import { GetEmporiumOutput } from '@app/emporium/output/get-emporium.output'
import { ValidateService } from '@app/shared/services/validate.service'
import { EmporiumEntity } from '@app/emporium/entities/emporium.entity'

@Injectable()
export class GetEmporium {
  constructor(
    @InjectRepository(EmporiumEntity)
    private readonly emporiumRepository: Repository<EmporiumEntity>,
    private readonly validateService: ValidateService
  ) {}

  async handle(input: GetEmporiumInput): Promise<GetEmporiumOutput> {
    const inputValidated = await this.validateService.validateAndTransformInput(GetEmporiumInput, input)
    const emporium = await this.emporiumRepository.findOne({ where: { id: inputValidated.id } })

    if (!emporium) {
      throw new NotFoundException('Emporium not found')
    }

    return plainToClass(GetEmporiumOutput, emporium)
  }
}
