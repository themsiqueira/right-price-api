import { Injectable, NotFoundException } from '@nestjs/common'

import MethodNotImplementedException from '@app/shared/exception/method-not-implemented-exception.exception'
import { GetEmporiumInput } from '@app/emporium/input/get-emporium.input'
import { GetEmporiumOutput } from '@app/emporium/output/get-emporium.output'
import { InjectRepository } from '@nestjs/typeorm'
import { EmporiumEntity } from '../entities/emporium.entity'
import { Repository } from 'typeorm'

@Injectable()
export class GetEmporium {
  constructor (
    @InjectRepository(EmporiumEntity)
    private readonly emporiumRepository: Repository<EmporiumEntity>,
  ) {}
  
  async handle (input: GetEmporiumInput): Promise<GetEmporiumOutput> {
    const emporium = await this.emporiumRepository.findOne({where: { id: input.id }});

    if (!emporium){
      throw new NotFoundException('Emporium not found');
    }

    const emporiumOutput: GetEmporiumOutput = {
      id: emporium.id,
      name: emporium.name,
      address: emporium.address,
      createdAt: emporium.createdAt,
      expiresAt: emporium.expiresAt,
      isDeleted: emporium.isDeleted,
    };
  
  return emporiumOutput;
  }
}
