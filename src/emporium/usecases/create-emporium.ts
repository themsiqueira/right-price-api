import { Injectable } from '@nestjs/common'
import { InjectEntityManager } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { plainToClass } from 'class-transformer'

import { ValidateService } from '@app/shared/services/validate.service'
import { EmporiumEntity } from '@app/emporium/entities/emporium.entity'
import { CreateEmporiumInput } from '@app/emporium/input/create-emporium.input'
import { CreateEmporiumOutput } from '@app/emporium/output/create-emporium.output'
import { UserEntity } from '@app/user/entities/user.entity'

@Injectable()
export class CreateEmporium {
  private readonly emporiumRepository: Repository<EmporiumEntity>
  private readonly userRepository: Repository<UserEntity>
  constructor(
    @InjectEntityManager() private readonly dataSource: DataSource,
    private readonly validateService: ValidateService
  ) {
    this.emporiumRepository = this.dataSource.getRepository(EmporiumEntity)
    this.userRepository = this.dataSource.getRepository(UserEntity)
  }

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
