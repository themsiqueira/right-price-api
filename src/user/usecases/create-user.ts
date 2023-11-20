import { Injectable } from '@nestjs/common'
import { InjectEntityManager } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { plainToInstance } from 'class-transformer'

import { CreateUserInput } from '@app/user/input/create-user.input'
import { CreateUserOutput } from '@app/user/output/create-user.output'
import { ValidateService } from '@app/shared/services/validate.service'
import { UserEntity } from '@app/user/entities/user.entity'

@Injectable()
export class CreateUser {
  private readonly userRepository: Repository<UserEntity>

  constructor(
    @InjectEntityManager() private readonly dataSource: DataSource,
    private readonly validateService: ValidateService
  ) {
    this.userRepository = this.dataSource.getRepository(UserEntity)
  }

  async handle(input: CreateUserInput): Promise<CreateUserOutput> {
    const inputValidated = await this.validateService.validateAndTransformInput(CreateUserInput, input)
    const user = await this.userRepository.save(this.userRepository.create(inputValidated))
    return this.mapOutput(user)
  }

  private mapOutput(user: UserEntity): CreateUserOutput {
    return plainToInstance(CreateUserOutput, user)
  }
}
