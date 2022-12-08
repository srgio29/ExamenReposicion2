import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Casa,
  Visita,
} from '../models';
import {CasaRepository} from '../repositories';

export class CasaVisitaController {
  constructor(
    @repository(CasaRepository)
    public casaRepository: CasaRepository,
  ) { }

  @get('/casas/{id}/visita', {
    responses: {
      '200': {
        description: 'Visita belonging to Casa',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Visita)},
          },
        },
      },
    },
  })
  async getVisita(
    @param.path.string('id') id: typeof Casa.prototype.id,
  ): Promise<Visita> {
    return this.casaRepository.casa(id);
  }
}
