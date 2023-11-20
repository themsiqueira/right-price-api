import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ListUser } from './list-user.use-case';
import { ListUserInput } from './list-user.input';
import { ListUserOutput } from './list-user.output';
import { UserEntity } from '../entities/user.entity';
import { PersonEntity } from '../entities/person.entity';
import { Repository } from 'typeorm';

class MockUserRepository extends Repository<UserEntity> {}
class MockPersonRepository extends Repository<PersonEntity> {}

describe('ListUser', () => {
  let listUser: ListUser;
  let userRepository: MockUserRepository;
  let personRepository: MockPersonRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListUser,
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

    listUser = module.get<ListUser>(ListUser);
    userRepository = module.get<MockUserRepository>(getRepositoryToken(UserEntity));
    personRepository = module.get<MockPersonRepository>(getRepositoryToken(PersonEntity));
  });

  it('should be defined', () => {
    expect(listUser).toBeDefined();
  });

  describe('handle', () => {
    it('should list users with specified criteria', async () => {
      const input: ListUserInput = {
        name: 'John',
        email: 'john@example.com',
        documentNumber: '123456789',
        birthDate: new Date('1990-01-01'),
      };

      const mockedUser = new UserEntity();
      mockedUser.id = 'user_id';
      mockedUser.email = 'john@example.com';
      mockedUser.person = new PersonEntity();
      mockedUser.person.id = 'person_id';
      mockedUser.person.name = 'John';
      mockedUser.person.documentNumber = '123456789';
      mockedUser.person.birthDate = new Date('1990-01-01');

      jest.spyOn(userRepository, 'createQueryBuilder').mockReturnValue(MockUserRepository as any);
      jest.spyOn(userRepository, 'leftJoinAndMapOne').mockReturnValue(MockUserRepository as any);
      jest.spyOn(userRepository, 'andWhere').mockReturnValue(MockUserRepository as any);
      jest.spyOn(userRepository, 'getMany').mockReturnValue([mockedUser]);

      const result: ListUserOutput[] = await listUser.handle(input);

      expect(userRepository.createQueryBuilder).toHaveBeenCalledWith('user');
      expect(userRepository.leftJoinAndMapOne).toHaveBeenCalledWith(
        'user.person',
        PersonEntity,
        'person',
        'person.id = user.personId',
      );
      expect(userRepository.andWhere).toHaveBeenCalledWith('person.name LIKE :name', { name: `%${input.name}%` });
      expect(userRepository.andWhere).toHaveBeenCalledWith('user.email LIKE :email', { email: `%${input.email}%` });
      expect(userRepository.andWhere).toHaveBeenCalledWith(
        'person.documentNumber LIKE :documentNumber',
        { documentNumber: `%${input.documentNumber}%` },
      );
      expect(userRepository.andWhere).toHaveBeenCalledWith('person.birthDate = :birthDate', {
        birthDate: input.birthDate,
      });
      expect(userRepository.getMany).toHaveBeenCalled();
      expect(result).toEqual([
        {
          id: 'user_id',
          name: 'John',
          email: 'john@example.com',
          documentNumber: '123456789',
          birthDate: new Date('1990-01-01'),
        },
      ]);
    });

    it('should return an empty array if no users match the criteria', async () => {
      const input: ListUserInput = {
        name: 'NonExistentUser',
      };

      jest.spyOn(userRepository, 'createQueryBuilder').mockReturnValue(MockUserRepository as any);
      jest.spyOn(userRepository, 'leftJoinAndMapOne').mockReturnValue(MockUserRepository as any);
      jest.spyOn(userRepository, 'andWhere').mockReturnValue(MockUserRepository as any);
      jest.spyOn(userRepository, 'getMany').mockReturnValue([]);

      const result: ListUserOutput[] = await listUser.handle(input);

      expect(userRepository.createQueryBuilder).toHaveBeenCalledWith('user');
      expect(userRepository.leftJoinAndMapOne).toHaveBeenCalledWith(
        'user.person',
        PersonEntity,
        'person',
        'person.id = user.personId',
      );
      expect(userRepository.andWhere).toHaveBeenCalledWith('person.name LIKE :name', { name: `%${input.name}%` });
      expect(userRepository.getMany).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });
});
