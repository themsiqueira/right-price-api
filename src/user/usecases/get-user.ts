import { Injectable } from '@nestjs/common'
import { InjectEntityManager } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'

import { GetUserInput } from '@app/user/input/get-user.input'
import { GetUserOutput } from '@app/user/output/get-user.output'
import { UserEntity } from '@app/user/entities/user.entity'
import { PersonEntity } from '@app/user/entities/person.entity'
import { ValidateService } from '@app/shared/services/validate.service'

@Injectable()
export class GetUser {
  private readonly userRepository: Repository<UserEntity>

  constructor(
    @InjectEntityManager() private readonly dataSource: DataSource,
    private readonly validateService: ValidateService
  ) {
    this.userRepository = this.dataSource.getRepository(UserEntity)
  }
  async handle(input: GetUserInput): Promise<GetUserOutput> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndMapOne('user.person', PersonEntity, 'person', 'person.id = user.personId')
      .where('user.id = :id', { id: input.id })
      .getOne()

    if (!user) {
      throw new Error('Usuário não encontrado.')
    }

    return {
      id: user.id,
      name: user.person.name,
      email: user.email,
      documentNumber: user.person.documentNumber,
      birthDate: user.person.birthDate
    }
  }
}
