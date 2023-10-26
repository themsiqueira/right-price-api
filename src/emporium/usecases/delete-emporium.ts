import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeleteEmporiumInput } from '@app/emporium/input/delete-emporium.input';
import { EmporiumEntity } from '@app/emporium/entities/emporium.entity';

@Injectable()
export class DeleteEmporium {
  constructor(
    @InjectRepository(EmporiumEntity)
    private readonly emporiumRepository: Repository<EmporiumEntity>,
  ) {}

  async handle(input: DeleteEmporiumInput): Promise<void> {
    const emporium = await this.emporiumRepository.findOne({where: { id: input.id }});
    if (!emporium) {
      throw new NotFoundException('Emporium not found');
    }

    emporium.isDeleted = true;
    emporium.deletedAt = new Date();
    await this.emporiumRepository.save(emporium);
  }
}
