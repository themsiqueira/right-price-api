import { Injectable } from '@nestjs/common'
import MethodNotImplementedException from '@app/shared/exception/method-not-implemented-exception.exception'
import { CreateUserInput } from '@app/user/input/create-user.input'
import { CreateUserOutput } from '@app/user/output/create-user.output'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ValidateService } from '@app/shared/services/validate.service';
import { UserEntity } from '@app/user/entities/user.entity';


@Injectable()
export class CreateUser {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private readonly validateService: ValidateService,
  ) {}

  async handle(input: CreateUserInput): Promise<CreateUserOutput> {
    const inputValidated = await this.validateService.validateAndTransformInput(CreateUserInput, input);
    const user = await this.userRepository.save(this.userRepository.create(inputValidated));
    return this.mapOutput(user);
  }

  private mapOutput(user: UserEntity): CreateUserOutput {
    return Object.assign(new CreateUserOutput(), user)
  }
}
