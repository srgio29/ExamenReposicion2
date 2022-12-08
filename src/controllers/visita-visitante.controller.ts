import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Visita,
  Visitante,
} from '../models';
import {VisitaRepository} from '../repositories';

export class VisitaVisitanteController {
  constructor(
    @repository(VisitaRepository)
    public visitaRepository: VisitaRepository,
  ) { }

  @get('/visitas/{id}/visitante', {
    responses: {
      '200': {
        description: 'Visitante belonging to Visita',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Visitante)},
          },
        },
      },
    },
  })
  async getVisitante(
    @param.path.string('id') id: typeof Visita.prototype.id,
  ): Promise<Visitante> {
    return this.visitaRepository.visitante(id);
  }
}
