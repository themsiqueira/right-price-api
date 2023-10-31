import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { plainToClass } from 'class-transformer'

import { EmporiumEntity } from '@app/emporium/entities/emporium.entity'
import { ListEmporiumInput } from '@app/emporium/input/list-emporium.input'
import { ListEmporiumOutput } from '@app/emporium/output/list-emporium.output'
import { ValidateService } from '@app/shared/services/validate.service'
import { GetEmporiumOutput } from '@app/emporium/output/get-emporium.output'

@Injectable()
export class ListEmporium {
  constructor(
    @InjectRepository(EmporiumEntity)
    private readonly emporiumRepository: Repository<EmporiumEntity>,
    private readonly validateService: ValidateService
  ) {}

  async handle(input: ListEmporiumInput): Promise<ListEmporiumOutput> {
    const inputValidated = await this.validateService.validateAndTransformInput(ListEmporiumInput, input)
    const queryBuilder = this.emporiumRepository.createQueryBuilder('emporium')

    if (inputValidated.name) {
      queryBuilder.where('emporium.name = :name', { name: `%${inputValidated.name}%` })
    }

    if (inputValidated.address) {
      queryBuilder.where('emporium.address = :address', { address: `%${inputValidated.address}%` })
    }

    const page = input.page || 1
    const limit = input.limit || 10
    const skip = (page - 1) * limit

    const total = await queryBuilder.getCount()

    const emporiums = await queryBuilder.skip(skip).take(limit).getMany()

    return this.mapOutput(total, page, emporiums)
  }

  private mapOutput(total: number, page: number, data: EmporiumEntity[]): ListEmporiumOutput {
    return {
      total,
      page,
      data: data.map((item) => plainToClass(GetEmporiumOutput, item))
    }
  }
}
