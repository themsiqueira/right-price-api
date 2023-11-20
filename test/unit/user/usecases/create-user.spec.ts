import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { CreateUser } from './create-user.usecase';
import { CreateUserInput } from '../input/create-user.input';
import { UserEntity } from '../entities/user.entity';
import { PersonEntity } from '../entities/person.entity';

class MockUserRepository extends Repository<UserEntity> {
  save = jest.fn();
  create = jest.fn();
}

class MockPersonRepository extends Repository<PersonEntity> {
  save = jest.fn();
}

describe('CreateUser', () => {
  let createUser: CreateUser;
  let userRepository: MockUserRepository;
  let personRepository: MockPersonRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUser,
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

    createUser = module.get<CreateUser>(CreateUser);
    userRepository = module.get<MockUserRepository>(getRepositoryToken(UserEntity));
    personRepository = module.get<MockPersonRepository>(getRepositoryToken(PersonEntity));
  });

  it('should be defined', () => {
    expect(createUser).toBeDefined();
  });

  describe('handle', () => {
    it('should create a user with associated person', async () => {
      const input: CreateUserInput = {
        name: 'John Doe',
        documentNumber: '123456789',
        birthDate: new Date(),
        email: 'john.doe@example.com',
        password: 'password123',
      };

      jest.spyOn(personRepository, 'save').mockReturnValue(Promise.resolve({ id: 'person_id' }));
      jest.spyOn(userRepository, 'save').mockReturnValue(Promise.resolve({ id: 'user_id' }));

      await createUser.handle(input);

      expect(personRepository.save).toHaveBeenCalledWith(expect.any(Object));
      expect(userRepository.create).toHaveBeenCalledWith(expect.any(Object));
      expect(userRepository.save).toHaveBeenCalledWith(expect.any(Object));
    });
  });
});
