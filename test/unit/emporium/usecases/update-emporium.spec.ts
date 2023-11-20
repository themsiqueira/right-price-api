import { Test, TestingModule } from '@nestjs/testing';
import { UpdateEmporium } from './update-emporium.usecase';
import { UpdateEmporiumInput } from '@app/emporium/input/update-emporium.input';
import { UpdateEmporiumOutput } from '@app/emporium/output/update-emporium.output';
import { EmporiumEntity } from '@app/emporium/entities/emporium.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('UpdateEmporium', () => {
  let updateEmporium: UpdateEmporium;
  let emporiumRepository: Repository<EmporiumEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateEmporium,
        {
          provide: getRepositoryToken(EmporiumEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    updateEmporium = module.get<UpdateEmporium>(UpdateEmporium);
    emporiumRepository = module.get<Repository<EmporiumEntity>>(
      getRepositoryToken(EmporiumEntity),
    );
  });

  it('should update Emporium and return the updated data', async () => {
    // Mock input data
    const input: UpdateEmporiumInput = {
      id: '1',
      name: 'Updated Emporium Name',
      userId: '123', // Replace with a valid userId
      expiresAt: new Date(),
      address: 'Updated Emporium Address',
    };

    // Mock the repository findOne and save methods
    const emporium: EmporiumEntity = {
      id: '1',
      name: 'Original Emporium Name',
      userId: '456', // Replace with a valid userId
      expiresAt: new Date(),
      address: 'Original Emporium Address',
      createdAt: new Date(),
      isDeleted: false,
    };
    jest.spyOn(emporiumRepository, 'findOne').mockResolvedValueOnce(emporium);
    jest.spyOn(emporiumRepository, 'save').mockResolvedValueOnce(emporium);

    // Execute the handle method
    const result: UpdateEmporiumOutput = await updateEmporium.handle(input);

    // Assert that the repository findOne method was called with the correct parameters
    expect(emporiumRepository.findOne).toHaveBeenCalledWith({ where: { id: input.id } });

    // Assert the repository save method was called with the updated Emporium
    expect(emporiumRepository.save).toHaveBeenCalledWith({
      ...emporium,
      name: input.name,
      userId: input.userId,
      expiresAt: input.expiresAt,
      address: input.address,
    });

    // Assert the output
    expect(result).toEqual({
      id: emporium.id,
      name: input.name,
      userId: input.userId,
      expiresAt: input.expiresAt,
      address: input.address,
      createdAt: emporium.createdAt,
      isDeleted: emporium.isDeleted,
    });
    // Add more assertions if needed based on your specific requirements
  });

  it('should throw NotFoundException if Emporium not found', async () => {
    // Mock input data
    const input: UpdateEmporiumInput = {
      id: 'nonexistent-id',
      name: 'Updated Emporium Name',
      userId: '123', // Replace with a valid userId
      expiresAt: new Date(),
      address: 'Updated Emporium Address',
    };

    // Mock the repository findOne method to return null (Emporium not found)
    jest.spyOn(emporiumRepository, 'findOne').mockResolvedValueOnce(null);

    // Execute the handle method and expect it to throw a NotFoundException
    await expect(updateEmporium.handle(input)).rejects.toThrowError(NotFoundException);
  });
});
