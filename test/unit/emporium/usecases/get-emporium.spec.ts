import { Test, TestingModule } from '@nestjs/testing';
import { GetEmporium } from './get-emporium.usecase';
import { GetEmporiumInput } from '@app/emporium/input/get-emporium.input';
import { GetEmporiumOutput } from '@app/emporium/output/get-emporium.output';
import { EmporiumEntity } from '@app/emporium/entities/emporium.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('GetEmporium', () => {
  let getEmporium: GetEmporium;
  let emporiumRepository: Repository<EmporiumEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetEmporium,
        {
          provide: getRepositoryToken(EmporiumEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    getEmporium = module.get<GetEmporium>(GetEmporium);
    emporiumRepository = module.get<Repository<EmporiumEntity>>(
      getRepositoryToken(EmporiumEntity),
    );
  });

  it('should get an Emporium', async () => {
    // Mock input data
    const input: GetEmporiumInput = {
      id: '123',
    };

    // Mock the repository findOne method
    const foundEmporium: EmporiumEntity = {
      id: input.id,
      name: 'Mock Emporium',
      address: 'Mock Address',
      createdAt: new Date(),
      expiresAt: new Date(),
      isDeleted: false,
      // Add other properties as needed
    };
    jest.spyOn(emporiumRepository, 'findOne').mockResolvedValueOnce(foundEmporium);

    // Execute the handle method
    const result: GetEmporiumOutput = await getEmporium.handle(input);

    // Assert that the repository findOne method was called with the correct parameters
    expect(emporiumRepository.findOne).toHaveBeenCalledWith({ where: { id: input.id } });
    
    // Assert the output
    expect(result).toEqual({
      id: foundEmporium.id,
      name: foundEmporium.name,
      address: foundEmporium.address,
      createdAt: foundEmporium.createdAt,
      expiresAt: foundEmporium.expiresAt,
      isDeleted: foundEmporium.isDeleted,
    });
    // Add more assertions if needed based on your specific requirements
  });

  it('should throw NotFoundException for non-existing Emporium', async () => {
    // Mock input data
    const input: GetEmporiumInput = {
      id: '123',
    };

    // Mock the repository findOne method to return null
    jest.spyOn(emporiumRepository, 'findOne').mockResolvedValueOnce(null);

    // Execute the handle method and expect it to throw NotFoundException
    await expect(getEmporium.handle(input)).rejects.toThrow(NotFoundException);
  });
});