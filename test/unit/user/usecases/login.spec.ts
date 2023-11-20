import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Login } from './login.use-case';
import { LoginInput } from './login.input';
import { LoginOutput } from './login.output';
import { UserEntity } from '../entities/user.entity';
import { PersonEntity } from '../entities/person.entity';
import { Repository } from 'typeorm';

class MockUserRepository extends Repository<UserEntity> {}
class MockPersonRepository extends Repository<PersonEntity> {}

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('Login', () => {
  let login: Login;
  let userRepository: MockUserRepository;
  let personRepository: MockPersonRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Login,
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

    login = module.get<Login>(Login);
    userRepository = module.get<MockUserRepository>(getRepositoryToken(UserEntity));
    personRepository = module.get<MockPersonRepository>(getRepositoryToken(PersonEntity));
  });

  it('should be defined', () => {
    expect(login).toBeDefined();
  });

  describe('handle', () => {
    it('should generate access and refresh tokens for valid credentials', async () => {
      const input: LoginInput = {
        email: 'test@example.com',
        password: 'password',
      };

      const mockedUser = new UserEntity();
      mockedUser.id = 'user_id';
      mockedUser.email = 'test@example.com';
      mockedUser.passwordHash = 'hashedPassword';
      mockedUser.person = new PersonEntity();
      mockedUser.person.id = 'person_id';
      mockedUser.person.name = 'Test User';
      mockedUser.person.documentNumber = '123456789';
      mockedUser.person.birthDate = new Date('1990-01-01');

      jest.spyOn(userRepository, 'createQueryBuilder').mockReturnValue(MockUserRepository as any);
      jest.spyOn(userRepository, 'leftJoinAndMapOne').mockReturnValue(MockUserRepository as any);
      jest.spyOn(userRepository, 'where').mockReturnValue(MockUserRepository as any);
      jest.spyOn(userRepository, 'getOne').mockReturnValue(mockedUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      jest.spyOn(jwt, 'sign').mockImplementation((payload, secret, options) => {
        if (secret === 'secretpassword') {
          return 'mockedAccessToken';
        } else if (secret === 'refreshsecretpassword') {
          return 'mockedRefreshToken';
        }
      });

      const result: LoginOutput = await login.handle(input);

      expect(userRepository.createQueryBuilder).toHaveBeenCalledWith('user');
      expect(userRepository.leftJoinAndMapOne).toHaveBeenCalledWith(
        'user.person',
        PersonEntity,
        'person',
        'person.id = user.personId',
      );
      expect(userRepository.where).toHaveBeenCalledWith('user.email = :email', { email: input.email });
      expect(userRepository.getOne).toHaveBeenCalled();
      expect(bcrypt.compare).toHaveBeenCalledWith(input.password, mockedUser.passwordHash);
      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: mockedUser.id, email: mockedUser.email },
        'secretpassword',
        { expiresIn: '1h' },
      );
      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: mockedUser.id, email: mockedUser.email },
        'refreshsecretpassword',
        { expiresIn: '7d' },
      );
      expect(result).toEqual({
        accessToken: 'mockedAccessToken',
        refreshToken: 'mockedRefreshToken',
      });
    });

    it('should throw an error for invalid credentials', async () => {
      const input: LoginInput = {
        email: 'test@example.com',
        password: 'password',
      };

      jest.spyOn(userRepository, 'createQueryBuilder').mockReturnValue(MockUserRepository as any);
      jest.spyOn(userRepository, 'leftJoinAndMapOne').mockReturnValue(MockUserRepository as any);
      jest.spyOn(userRepository, 'where').mockReturnValue(MockUserRepository as any);
      jest.spyOn(userRepository, 'getOne').mockReturnValue(undefined);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      await expect(login.handle(input)).rejects.toThrowError('Credenciais inválidas.');
    });
  });
});
