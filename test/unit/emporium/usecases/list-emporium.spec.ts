import { Test, TestingModule } from '@nestjs/testing';
import { ListEmporium } from './list-emporium.usecase';
import { ListEmporiumInput } from '@app/emporium/input/list-emporium.input';
import { ListEmporiumOutput } from '@app/emporium/output/list-emporium.output';
import { EmporiumEntity } from '@app/emporium/entities/emporium.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ListEmporium', () => {
  let listEmporium: ListEmporium;
  let emporiumRepository: Repository<EmporiumEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListEmporium,
        {
          provide: getRepositoryToken(EmporiumEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    listEmporium = module.get<ListEmporium>(ListEmporium);
    emporiumRepository = module.get<Repository<EmporiumEntity>>(
      getRepositoryToken(EmporiumEntity),
    );
  });

  it('should list Emporiums with filters and pagination', async () => {
    // Mock input data
    const input: ListEmporiumInput = {
      name: 'Mock Emporium',
      address: 'Mock Address',
      page: 2,
      limit: 5,
    };

    // Mock the repository createQueryBuilder and getMany methods
    const emporiums: EmporiumEntity[] = [
      // Mock Emporium entities with properties as needed
      { id: '1', name: 'Mock Emporium 1', address: 'Mock Address 1' },
      { id: '2', name: 'Mock Emporium 2', address: 'Mock Address 2' },
      // Add more entities as needed
    ];
    jest.spyOn(emporiumRepository, 'createQueryBuilder').mockReturnValueOnce({
      where: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValueOnce(emporiums),
    } as any);

    // Execute the handle method
    const result: ListEmporiumOutput[] = await listEmporium.handle(input);

    // Assert that the repository createQueryBuilder method was called with the correct parameters
    expect(emporiumRepository.createQueryBuilder).toHaveBeenCalledWith('emporium');

    // Assert the repository methods were called with the correct parameters
    expect(emporiumRepository.createQueryBuilder().where).toHaveBeenCalledWith('emporium.name = :name', { name: input.name });
    expect(emporiumRepository.createQueryBuilder().where).toHaveBeenCalledWith('emporium.address = :address', { address: input.address });
    expect(emporiumRepository.createQueryBuilder().skip).toHaveBeenCalledWith((input.page - 1) * input.limit);
    expect(emporiumRepository.createQueryBuilder().take).toHaveBeenCalledWith(input.limit);

    // Assert the output
    expect(result).toEqual([
      { id: '1', name: 'Mock Emporium 1' },
      { id: '2', name: 'Mock Emporium 2' },
      // Add more expected output items as needed
    ]);
    // Add more assertions if needed based on your specific requirements
  });
});
