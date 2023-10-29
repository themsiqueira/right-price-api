import { Injectable } from '@nestjs/common'
import MethodNotImplementedException from '@app/shared/exception/method-not-implemented-exception.exception'
import { LoginInput } from '@app/user/input/login.input'
import { LoginOutput } from '@app/user/output/login.output'
import * as bcrypt from 'bcrypt'; // ATENÇÃO, ALTERAR CONFORME O CÓDIGO DE AUTENTIFICAÇÃO E TOKENS 
import * as jwt from 'jsonwebtoken'; // ATENÇÃO, ALTERAR CONFORME O CÓDIGO DE AUTENTIFICAÇÃO E TOKENS 
import { UserEntity } from '@app/user/entities/user.entity';
import { PersonEntity } from '@app/user/entities/person.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class Login {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(PersonEntity) private readonly personRepository: Repository<PersonEntity>,
  ) {}

  async handle(input: LoginInput): Promise<LoginOutput> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndMapOne('user.person', PersonEntity, 'person', 'person.id = user.personId')
      .where('user.email = :email', { email: input.email })
      .getOne();

    if (!user || !await bcrypt.compare(input.password, user.passwordHash)) {
      throw new Error('Credenciais inválidas.');
    }

    const accessToken = jwt.sign(
      { userId: user.id, email: user.email },
      'secretpassword', 
      { expiresIn: '1h' } 
    );

    const refreshToken = jwt.sign(
      { userId: user.id, email: user.email },
      'refreshsecretpassword', 
      { expiresIn: '7d' } 
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
