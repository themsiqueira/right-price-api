import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { DataSource, Repository } from 'typeorm'
import { InjectEntityManager } from '@nestjs/typeorm'

import { LoginInput } from '@app/user/input/login.input'
import { LoginOutput } from '@app/user/output/login.output'
import { UserEntity } from '@app/user/entities/user.entity'
import { PersonEntity } from '@app/user/entities/person.entity'
import { ValidateService } from '@app/shared/services/validate.service'

@Injectable()
export class Login {
  private readonly userRepository: Repository<UserEntity>

  constructor(
    @InjectEntityManager() private readonly dataSource: DataSource,
    private readonly validateService: ValidateService
  ) {
    this.userRepository = this.dataSource.getRepository(UserEntity)
  }

  async handle(input: LoginInput): Promise<LoginOutput> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndMapOne('user.person', PersonEntity, 'person', 'person.id = user.personId')
      .where('user.email = :email', { email: input.email })
      .getOne()

    if (!user || !(await bcrypt.compare(input.password, user.passwordHash))) {
      throw new Error('Credenciais inválidas.')
    }

    const accessToken = jwt.sign({ userId: user.id, email: user.email }, 'secretpassword', { expiresIn: '1h' })

    const refreshToken = jwt.sign({ userId: user.id, email: user.email }, 'refreshsecretpassword', { expiresIn: '7d' })

    return {
      accessToken,
      refreshToken
    }
  }
}
