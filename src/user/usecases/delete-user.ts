import { Injectable } from '@nestjs/common'
import MethodNotImplementedException from '@app/shared/exception/method-not-implemented-exception.exception'
import { DeleteUserInput } from '@app/user/input/delete-user.input'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@app/user/entities/user.entity';

@Injectable()
export class DeleteUser {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) {}

  async handle(input: DeleteUserInput): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: input.id },
    });

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    await this.userRepository.remove(user);
  }
}






