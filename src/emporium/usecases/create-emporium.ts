import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { plainToClass } from 'class-transformer'

import { ValidateService } from '@app/shared/services/validate.service'
import { EmporiumEntity } from '@app/emporium/entities/emporium.entity'
import { CreateEmporiumInput } from '@app/emporium/input/create-emporium.input'
import { CreateEmporiumOutput } from '@app/emporium/output/create-emporium.output'
import { UserEntity } from '@app/user/entities/user.entity'

@Injectable()
export class CreateEmporium {
  constructor(
    @InjectRepository(EmporiumEntity) private readonly emporiumRepository: Repository<EmporiumEntity>,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private readonly validateService: ValidateService
  ) {}

  async handle(input: CreateEmporiumInput): Promise<CreateEmporiumOutput> {
    const inputValidated = await this.validateService.validateAndTransformInput(CreateEmporiumInput, input)
    const userFound = await this.userRepository.findOne({ where: { id: inputValidated.userId } })
    const emporiumEntity = this.emporiumRepository.create(<Partial<EmporiumEntity>>{ ...inputValidated, userId: userFound })
    const emporium = await this.emporiumRepository.save(emporiumEntity)
    return this.mapOutput(emporium)
  }

  private mapOutput(emporium: EmporiumEntity): CreateEmporiumOutput {
    return plainToClass(CreateEmporiumOutput, emporium)
  }
}
