import { Test, TestingModule } from '@nestjs/testing';
import { CreatePromotion } from './create-promotion.usecase';
import { PromotionEntity } from '@app/promotion/entities/promotion.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreatePromotionInput } from '@app/promotion/input/create-promotion.input';

describe('CreatePromotion', () => {
  let createPromotion: CreatePromotion;
  let promotionRepository: Repository<PromotionEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePromotion,
        {
          provide: getRepositoryToken(PromotionEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    createPromotion = module.get<CreatePromotion>(CreatePromotion);
    promotionRepository = module.get<Repository<PromotionEntity>>(
      getRepositoryToken(PromotionEntity),
    );
  });

  it('should create a promotion', async () => {
    const createPromotionInput: CreatePromotionInput = {
      emporiumId: 'emporium_id',
      userId: 'user_id',
      price: 50,
      expiresAt: new Date(),
    };

    const savedPromotion = new PromotionEntity();
    savedPromotion.id = 'generated_id';
    savedPromotion.price = createPromotionInput.price;
    savedPromotion.createdAt = new Date();
    savedPromotion.expiresAt = createPromotionInput.expiresAt;

    jest
      .spyOn(promotionRepository, 'create')
      .mockReturnValue(createPromotionInput as any);
    jest
      .spyOn(promotionRepository, 'save')
      .mockReturnValue(Promise.resolve(savedPromotion));

    const result = await createPromotion.handle(createPromotionInput);

    expect(result).toEqual({
      id: 'generated_id',
      price: createPromotionInput.price,
      createdAt: savedPromotion.createdAt,
      expiresAt: createPromotionInput.expiresAt,
    });
  });
});