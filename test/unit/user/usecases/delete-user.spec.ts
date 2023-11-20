import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { DeleteUser } from './delete-user.usecase';
import { DeleteUserInput } from '../input/delete-user.input';
import { UserEntity } from '../entities/user.entity';

class MockUserRepository extends Repository<UserEntity> {
  findOne = jest.fn();
  remove = jest.fn();
}

describe('DeleteUser', () => {
  let deleteUser: DeleteUser;
  let userRepository: MockUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUser,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: MockUserRepository,
        },
      ],
    }).compile();

    deleteUser = module.get<DeleteUser>(DeleteUser);
    userRepository = module.get<MockUserRepository>(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(deleteUser).toBeDefined();
  });

  describe('handle', () => {
    it('should delete a user', async () => {
      jest.spyOn(userRepository, 'findOne').mockReturnValue(Promise.resolve({ id: 'user_id' }));

      const input: DeleteUserInput = {
        id: 'user_id',
      };

      await deleteUser.handle(input);

      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id: input.id } });
      expect(userRepository.remove).toHaveBeenCalledWith({ id: input.id });
    });

    it('should throw an error if user is not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockReturnValue(Promise.resolve(null));

      const input: DeleteUserInput = {
        id: 'non_existent_user_id',
      };

      await expect(deleteUser.handle(input)).rejects.toThrowError('Usuário não encontrado.');
    });
  });
});
