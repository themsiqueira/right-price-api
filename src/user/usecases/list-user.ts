import { Injectable } from '@nestjs/common'
import MethodNotImplementedException from '@app/shared/exception/method-not-implemented-exception.exception'
import { ListUserInput } from '@app/user/input/list-user.input'
import { ListUserOutput } from '@app/user/output/list-user.output'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@app/user/entities/user.entity';
import { PersonEntity } from '@app/user/entities/person.entity';


@Injectable()
export class ListUser {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(PersonEntity) private readonly personRepository: Repository<PersonEntity>,
  ) {}

  async handle(input: ListUserInput): Promise<ListUserOutput[]> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    queryBuilder.leftJoinAndMapOne('user.person', PersonEntity, 'person', 'person.id = user.personId');

    if (input.name) {
      queryBuilder.andWhere('person.name LIKE :name', { name: `%${input.name}%` });
    }

    if (input.email) {
      queryBuilder.andWhere('user.email LIKE :email', { email: `%${input.email}%` });
    }

    if (input.documentNumber) {
      queryBuilder.andWhere('person.documentNumber LIKE :documentNumber', { documentNumber: `%${input.documentNumber}%` });
    }

    if (input.birthDate) {
      queryBuilder.andWhere('person.birthDate = :birthDate', { birthDate: input.birthDate });
    }

    const users = await queryBuilder.getMany();

    return users.map(user => ({
      id: user.id,
      name: user.person.name,
      email: user.email,
      documentNumber: user.person.documentNumber,
      birthDate: user.person.birthDate,
    }));
  }
}