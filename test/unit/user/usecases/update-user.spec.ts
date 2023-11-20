import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateUser } from './update-user.use-case';
import { UpdateUserInput } from './update-user.input';
import { UpdateUserOutput } from './update-user.output';
import { UserEntity } from '../entities/user.entity';
import { PersonEntity } from '../entities/person.entity';
import { Repository } from 'typeorm';

class MockUserRepository extends Repository<UserEntity> {}
class MockPersonRepository extends Repository<PersonEntity> {}

describe('UpdateUser', () => {
  let updateUser: UpdateUser;
  let userRepository: MockUserRepository;
  let personRepository: MockPersonRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUser,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: MockUserRepository,
        },
        {
          provide: getRepositoryToken(PersonEntity),
          useClass: MockPersonRepository,
        },
      ],
    }).compile();

    updateUser = module.get<UpdateUser>(UpdateUser);
    userRepository = module.get<MockUserRepository>(getRepositoryToken(UserEntity));
    personRepository = module.get<MockPersonRepository>(getRepositoryToken(PersonEntity));
  });

  it('should be defined', () => {
    expect(updateUser).toBeDefined();
  });

  describe('handle', () => {
    it('should update user information and return the updated user', async () => {
      const input: UpdateUserInput = {
        userId: 'user_id',
        name: 'Updated User',
        email: 'updated@example.com',
        documentNumber: '987654321',
        birthDate: new Date('1995-05-05'),
      };

      const mockedUser = new UserEntity();
      mockedUser.id = 'user_id';
      mockedUser.email = 'test@example.com';
      mockedUser.person = new PersonEntity();
      mockedUser.person.id = 'person_id';
      mockedUser.person.name = 'Test User';
      mockedUser.person.documentNumber = '123456789';
      mockedUser.person.birthDate = new Date('1990-01-01');

      jest.spyOn(userRepository, 'createQueryBuilder').mockReturnValue(MockUserRepository as any);
      jest.spyOn(userRepository, 'leftJoinAndMapOne').mockReturnValue(MockUserRepository as any);
      jest.spyOn(userRepository, 'where').mockReturnValue(MockUserRepository as any);
      jest.spyOn(userRepository, 'getOne').mockReturnValue(mockedUser);
      jest.spyOn(personRepository, 'save').mockReturnValue(Promise.resolve());
      jest.spyOn(userRepository, 'save').mockReturnValue(Promise.resolve());

      const result: UpdateUserOutput = await updateUser.handle(input);

      expect(userRepository.createQueryBuilder).toHaveBeenCalledWith('user');
      expect(userRepository.leftJoinAndMapOne).toHaveBeenCalledWith(
        'user.person',
        PersonEntity,
        'person',
        'person.id = user.personId',
      );
      expect(userRepository.where).toHaveBeenCalledWith('user.id = :id', { id: input.userId });
      expect(userRepository.getOne).toHaveBeenCalled();
      expect(personRepository.save).toHaveBeenCalledWith(mockedUser.person);
      expect(userRepository.save).toHaveBeenCalledWith(mockedUser);
      expect(result).toEqual({
        id: mockedUser.id,
        name: mockedUser.person.name,
        email: mockedUser.email,
        documentNumber: mockedUser.person.documentNumber,
        birthDate: mockedUser.person.birthDate,
      });
    });

    it('should throw an error for a non-existing user', async () => {
      const input: UpdateUserInput = {
        userId: 'non_existing_user',
        name: 'Updated User',
      };

      jest.spyOn(userRepository, 'createQueryBuilder').mockReturnValue(MockUserRepository as any);
      jest.spyOn(userRepository, 'leftJoinAndMapOne').mockReturnValue(MockUserRepository as any);
      jest.spyOn(userRepository, 'where').mockReturnValue(MockUserRepository as any);
      jest.spyOn(userRepository, 'getOne').mockReturnValue(undefined);

      await expect(updateUser.handle(input)).rejects.toThrowError('Usuário não encontrado.');
    });
  });
});
