import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import MethodNotImplementedException from '@app/shared/exception/method-not-implemented-exception.exception'
import { UpdateUserInput } from '@app/user/input/update-user.input'
import { UpdateUserOutput } from '@app/user/output/update-user.output'
import { UserEntity } from '@app/user/entities/user.entity'
import { PersonEntity } from '@app/user/entities/person.entity'

@Injectable()
export class UpdateUser {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(PersonEntity) private readonly personRepository: Repository<PersonEntity>
  ) {}

  async handle(input: UpdateUserInput): Promise<UpdateUserOutput> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndMapOne('user.person', PersonEntity, 'person', 'person.id = user.personId')
      .where('user.id = :id', { id: input.userId })
      .getOne()

    if (!user) {
      throw new Error('Usuário não encontrado.')
    }

    if (input.name) {
      user.person.name = input.name
    }

    if (input.email) {
      user.email = input.email
    }

    if (input.birthDate) {
      user.person.birthDate = input.birthDate
    }

    await this.personRepository.save(user.person)
    await this.userRepository.save(user)

    return {
      id: user.id,
      name: user.person.name,
      email: user.email,
      documentNumber: user.person.documentNumber,
      birthDate: user.person.birthDate
    }
  }
}
