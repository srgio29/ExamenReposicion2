import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Residente,
  HabitantesCasa,
} from '../models';
import {ResidenteRepository} from '../repositories';

export class ResidenteHabitantesCasaController {
  constructor(
    @repository(ResidenteRepository)
    public residenteRepository: ResidenteRepository,
  ) { }

  @get('/residentes/{id}/habitantes-casa', {
    responses: {
      '200': {
        description: 'HabitantesCasa belonging to Residente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(HabitantesCasa)},
          },
        },
      },
    },
  })
  async getHabitantesCasa(
    @param.path.string('id') id: typeof Residente.prototype.id,
  ): Promise<HabitantesCasa> {
    return this.residenteRepository.habitantesCasa(id);
  }
}
