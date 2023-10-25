import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeleteEmporiumInput } from '@app/emporium/input/delete-emporium.input';
import { EmporiumEntity } from '@app/emporium/entities/emporium.entity';
import { DeleteEmporiumOutput } from '@app/emporium/output/delete-emporium.output';

@Injectable()
export class DeleteEmporium {
  constructor(
    @InjectRepository(EmporiumEntity)
    private readonly emporiumRepository: Repository<EmporiumEntity>,
    @InjectRepository(DeleteEmporiumOutput)
    private readonly deleteEmporiumOutputRepository: Repository<DeleteEmporiumOutput>,
  ) {}

  async handle(input: DeleteEmporiumInput): Promise<DeleteEmporiumOutput> {
    const emporium = await this.emporiumRepository.findOne(input.id);
    if (!emporium) {
      throw new NotFoundException('Emporium not found');
    }

    emporium.isDeleted = true;
    emporium.deletedAt = new Date();
    await this.emporiumRepository.save(emporium);

    // Create a DeleteEmporiumOutput record in the database
    const deleteOutput = new DeleteEmporiumOutput();
    await this.deleteEmporiumOutputRepository.save(deleteOutput);

    return deleteOutput;
  }
}
