import { Injectable } from '@nestjs/common'
import { GetUserInput } from '@app/user/input/get-user.input'
import { GetUserOutput } from '@app/user/output/get-user.output'
import MethodNotImplementedException from '@app/shared/exception/method-not-implemented-exception.exception'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@app/user/entities/user.entity';
import { PersonEntity } from '@app/user/entities/person.entity';


@Injectable()
export class GetUser {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(PersonEntity) private readonly personRepository: Repository<PersonEntity>,
  ) {}

  async handle(input: GetUserInput): Promise<GetUserOutput> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndMapOne('user.person', PersonEntity, 'person', 'person.id = user.personId')
      .where('user.id = :id', { id: input.id })
      .getOne();

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    return {
      id: user.id,
      name: user.person.name, 
      email: user.email,
      documentNumber: user.person.documentNumber, 
      birthDate: user.person.birthDate, 
    };
  }
}