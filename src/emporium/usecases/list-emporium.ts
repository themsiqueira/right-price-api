import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmporiumEntity } from '@app/emporium/entities/emporium.entity';
import { ListEmporiumInput } from '@app/emporium/input/list-emporium.input';
import { ListEmporiumOutput } from '@app/emporium/output/list-emporium.output';

@Injectable()
export class ListEmporium {
  constructor(
    @InjectRepository(EmporiumEntity)
    private readonly emporiumRepository: Repository<EmporiumEntity>,
  ) {}

  async handle(input: ListEmporiumInput): Promise<ListEmporiumOutput[]> {
    // Create a query builder for the EmporiumEntity
    const queryBuilder = this.emporiumRepository.createQueryBuilder('emporium');

    // Apply filters if provided in the input
    if (input.name) {
      queryBuilder.where('emporium.name = :name', { name: input.name });
    }

    if (input.address) {
      queryBuilder.where('emporium.address = :address', { address: input.address });
    }

    // Pagination
    const page = input.page || 1;
    const limit = input.limit || 10;
    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    // Execute the query and retrieve the list of emporiums
    const emporiums = await queryBuilder.getMany();

    // Map the results to the ListEmporiumOutput format
    const emporiumOutputs: ListEmporiumOutput[] = emporiums.map((emporium) => ({
      id: emporium.id,
      name: emporium.name,
      // Map other properties as needed
    }));

    return emporiumOutputs;
  }
}
