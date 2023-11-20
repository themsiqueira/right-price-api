import { Test, TestingModule } from '@nestjs/testing';
import { DeleteEmporium } from './delete-emporium.usecase';
import { DeleteEmporiumInput } from '@app/emporium/input/delete-emporium.input';
import { EmporiumEntity } from '@app/emporium/entities/emporium.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('DeleteEmporium', () => {
  let deleteEmporium: DeleteEmporium;
  let emporiumRepository: Repository<EmporiumEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteEmporium,
        {
          provide: getRepositoryToken(EmporiumEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    deleteEmporium = module.get<DeleteEmporium>(DeleteEmporium);
    emporiumRepository = module.get<Repository<EmporiumEntity>>(
      getRepositoryToken(EmporiumEntity),
    );
  });

  it('should delete an Emporium', async () => {
    // Mock input data
    const input: DeleteEmporiumInput = {
      id: '123',
    };

    // Mock the repository findOne and save methods
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
    jest.spyOn(emporiumRepository, 'save').mockImplementationOnce(async () => {});

    // Execute the handle method
    await deleteEmporium.handle(input);

    // Assert that the repository findOne and save methods were called with the correct parameters
    expect(emporiumRepository.findOne).toHaveBeenCalledWith({ where: { id: input.id } });
    expect(emporiumRepository.save).toHaveBeenCalledWith(foundEmporium);
    // Add more assertions if needed based on your specific requirements
  });
});