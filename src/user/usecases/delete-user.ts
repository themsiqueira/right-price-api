import { Injectable } from '@nestjs/common'
import { InjectEntityManager } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'

import { DeleteUserInput } from '@app/user/input/delete-user.input'
import { UserEntity } from '@app/user/entities/user.entity'
import { ValidateService } from '@app/shared/services/validate.service'

@Injectable()
export class DeleteUser {
  private readonly userRepository: Repository<UserEntity>

  constructor(
    @InjectEntityManager() private readonly dataSource: DataSource,
    private readonly validateService: ValidateService
  ) {
    this.userRepository = this.dataSource.getRepository(UserEntity)
  }

  async handle(input: DeleteUserInput): Promise<void> {
    const inputValidated = await this.validateService.validateAndTransformInput(DeleteUserInput, input)
    const user = await this.userRepository.findOne({
      where: { id: inputValidated.id }
    })

    if (!user) {
      throw new Error('Usuário não encontrado.')
    }

    user.deletedAt = new Date()

    await this.userRepository.save(user)
  }
}
