import { IsNotEmpty, IsString } from 'class-validator';

export class GetPromotionInput {
  @IsNotEmpty()
  @IsString()
  id: string
}
