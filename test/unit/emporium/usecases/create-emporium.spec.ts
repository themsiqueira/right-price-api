import { Test, TestingModule } from '@nestjs/testing';
import { CreateEmporium } from './create-emporium.usecase';
import { CreateEmporiumInput } from '@app/emporium/input/create-emporium.input';
import { CreateEmporiumOutput } from '@app/emporium/output/create-emporium.output';
import { EmporiumEntity } from '@app/emporium/entities/emporium.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ValidateService } from '@app/shared/services/validate.service';

describe('CreateEmporium', () => {
  let createEmporium: CreateEmporium;
  let emporiumRepository: Repository<EmporiumEntity>;
  let validateService: ValidateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateEmporium,
        ValidateService,
        {
          provide: getRepositoryToken(EmporiumEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    createEmporium = module.get<CreateEmporium>(CreateEmporium);
    emporiumRepository = module.get<Repository<EmporiumEntity>>(
      getRepositoryToken(EmporiumEntity),
    );
    validateService = module.get<ValidateService>(ValidateService);
  });

  it('should create an Emporium', async () => {
    // Mock input data
    const input: CreateEmporiumInput = {
      name: 'Emporium Name',
      address: 'Emporium Address',
      id: '123',
    };

    // Mock the validation service
    jest.spyOn(validateService, 'validateAndTransformInput').mockResolvedValueOnce(input);

    // Mock the repository save method
    const savedEmporium: EmporiumEntity = {
      id: input.id,
      name: input.name,
      address: input.address,
      createdAt: new Date(),
      expiresAt: new Date(),
      isDeleted: false,
      
    };
    jest.spyOn(emporiumRepository, 'save').mockResolvedValueOnce(savedEmporium);

    
    const result: CreateEmporiumOutput = await createEmporium.handle(input);
    expect(result).toBeDefined();
    expect(result.id).toEqual(savedEmporium.id);
    expect(result.name).toEqual(savedEmporium.name);
    expect(result.address).toEqual(savedEmporium.address);
  });
});