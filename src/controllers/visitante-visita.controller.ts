import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Visitante,
  Visita,
} from '../models';
import {VisitanteRepository} from '../repositories';

export class VisitanteVisitaController {
  constructor(
    @repository(VisitanteRepository) protected visitanteRepository: VisitanteRepository,
  ) { }

  @get('/visitantes/{id}/visitas', {
    responses: {
      '200': {
        description: 'Array of Visitante has many Visita',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Visita)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Visita>,
  ): Promise<Visita[]> {
    return this.visitanteRepository.visitas(id).find(filter);
  }

  @post('/visitantes/{id}/visitas', {
    responses: {
      '200': {
        description: 'Visitante model instance',
        content: {'application/json': {schema: getModelSchemaRef(Visita)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Visitante.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visita, {
            title: 'NewVisitaInVisitante',
            exclude: ['id'],
            optional: ['visitanteId']
          }),
        },
      },
    }) visita: Omit<Visita, 'id'>,
  ): Promise<Visita> {
    return this.visitanteRepository.visitas(id).create(visita);
  }

  @patch('/visitantes/{id}/visitas', {
    responses: {
      '200': {
        description: 'Visitante.Visita PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visita, {partial: true}),
        },
      },
    })
    visita: Partial<Visita>,
    @param.query.object('where', getWhereSchemaFor(Visita)) where?: Where<Visita>,
  ): Promise<Count> {
    return this.visitanteRepository.visitas(id).patch(visita, where);
  }

  @del('/visitantes/{id}/visitas', {
    responses: {
      '200': {
        description: 'Visitante.Visita DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Visita)) where?: Where<Visita>,
  ): Promise<Count> {
    return this.visitanteRepository.visitas(id).delete(where);
  }
}
