import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { DeleteUserInput } from '@app/user/input/delete-user.input'
import { UserEntity } from '@app/user/entities/user.entity'
import { ValidateService } from '@app/shared/services/validate.service'

@Injectable()
export class DeleteUser {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private readonly validateService: ValidateService
  ) {}

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
