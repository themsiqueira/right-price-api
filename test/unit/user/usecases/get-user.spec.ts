describe('GetUser', () => {
  let getUser: GetUser;
  let userRepository: MockUserRepository;
  let personRepository: MockPersonRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUser,
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

    getUser = module.get<GetUser>(GetUser);
    userRepository = module.get<MockUserRepository>(getRepositoryToken(UserEntity));
    personRepository = module.get<MockPersonRepository>(getRepositoryToken(PersonEntity));
  });

  it('should be defined', () => {
    expect(getUser).toBeDefined();
  });

  describe('handle', () => {
    it('should get a user with associated person', async () => {
      const input: GetUserInput = {
        id: 'user_id',
      };

      jest
        .spyOn(userRepository, 'createQueryBuilder')
        .mockReturnValue(MockUserRepository as any);
      jest
        .spyOn(userRepository, 'leftJoinAndMapOne')
        .mockReturnValue(MockUserRepository as any);
      jest.spyOn(userRepository, 'where').mockReturnValue(MockUserRepository as any);
      jest.spyOn(userRepository, 'getOne').mockReturnValue({
        id: 'user_id',
        email: 'john.doe@example.com',
        person: {
          id: 'person_id',
          name: 'John Doe',
          documentNumber: '123456789',
          birthDate: new Date(),
        },
      });

      const result: GetUserOutput = await getUser.handle(input);

      expect(userRepository.createQueryBuilder).toHaveBeenCalledWith('user');
      expect(userRepository.leftJoinAndMapOne).toHaveBeenCalledWith(
        'user.person',
        PersonEntity,
        'person',
        'person.id = user.personId',
      );
      expect(userRepository.where).toHaveBeenCalledWith('user.id = :id', { id: input.id });
      expect(userRepository.getOne).toHaveBeenCalled();
      expect(result).toEqual({
        id: 'user_id',
        name: 'John Doe',
        email: 'john.doe@example.com',
        documentNumber: '123456789',
        birthDate: expect.any(Date),
      });
    });

    it('should throw an error if user is not found', async () => {
      jest.spyOn(userRepository, 'createQueryBuilder').mockReturnValue(MockUserRepository as any);
      jest.spyOn(userRepository, 'leftJoinAndMapOne').mockReturnValue(MockUserRepository as any);
      jest.spyOn(userRepository, 'where').mockReturnValue(MockUserRepository as any);
      jest.spyOn(userRepository, 'getOne').mockReturnValue(undefined);

      const input: GetUserInput = {
        id: 'non_existent_user_id',
      };

      await expect(getUser.handle(input)).rejects.toThrowError('Usuário não encontrado.');
    });
  });
});
