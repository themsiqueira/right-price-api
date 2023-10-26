import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmporiumEntity } from '../entities/emporium.entity';
import { UpdateEmporiumInput } from '../input/update-emporium.input';
import { UpdateEmporiumOutput } from '../output/update-emporium.output';


@Injectable()
export class UpdateEmporium {
  constructor(
    @InjectRepository(EmporiumEntity)
    private readonly emporiumRepository: Repository<EmporiumEntity>,
  ) {}

  async handle(input: UpdateEmporiumInput): Promise<UpdateEmporiumOutput> {
    const emporium = await this.emporiumRepository.findOne({where: {id: input.id}});

    if (!emporium) {
      throw new NotFoundException('Emporium not found');
    }

    if (input.name) {
      emporium.name = input.name;
    }

    if (input.userId) {
      emporium.userId = input.userId;
    }

    if (input.expiresAt){
      emporium.expiresAt = input.expiresAt;
    }

    if (input.address){
      emporium.address = input.address;
    }

    // Save the updated Emporium
    await this.emporiumRepository.save(emporium);

    // Build the UpdateEmporiumOutput
    const emporiumOutput: UpdateEmporiumOutput = {
      id: emporium.id,
      name: emporium.name,
      address: emporium.address,
      userId: emporium.userId,
      createdAt: emporium.createdAt,
      expiresAt: emporium.expiresAt,
      isDeleted: emporium.isDeleted,
    }

    return emporiumOutput;
  }
}
