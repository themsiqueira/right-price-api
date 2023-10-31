import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { plainToClass } from 'class-transformer'

import { ListUserInput } from '@app/user/input/list-user.input'
import { ListUserOutput } from '@app/user/output/list-user.output'
import { UserEntity } from '@app/user/entities/user.entity'
import { PersonEntity } from '@app/user/entities/person.entity'
import { ValidateService } from '@app/shared/services/validate.service'
import { GetUserOutput } from '@app/user/output/get-user.output'

@Injectable()
export class ListUser {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private readonly validateService: ValidateService
  ) {}

  async handle(input: ListUserInput): Promise<ListUserOutput> {
    const inputValidated = await this.validateService.validateAndTransformInput(ListUserInput, input)
    const queryBuilder = this.userRepository.createQueryBuilder('user')
    queryBuilder
      .leftJoinAndMapOne('user.person', PersonEntity, 'person', 'person.id = user.personId')
      .where('user.person.name LIKE :name', { name: `%${inputValidated.name}%` })

    const page = inputValidated.page || 1
    const limit = inputValidated.limit || 10
    const skip = (page - 1) * limit

    const total = await queryBuilder.getCount()

    const users = await queryBuilder.skip(skip).take(limit).getMany()

    return this.mapOutput(total, page, users)
  }

  private mapOutput(total: number, page: number, data: Array<UserEntity>): ListUserOutput {
    return {
      total,
      page,
      data: data.map((item) => plainToClass(GetUserOutput, item))
    }
  }
}
