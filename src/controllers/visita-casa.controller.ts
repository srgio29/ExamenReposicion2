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
  Visita,
  Casa,
} from '../models';
import {VisitaRepository} from '../repositories';

export class VisitaCasaController {
  constructor(
    @repository(VisitaRepository) protected visitaRepository: VisitaRepository,
  ) { }

  @get('/visitas/{id}/casas', {
    responses: {
      '200': {
        description: 'Array of Visita has many Casa',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Casa)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Casa>,
  ): Promise<Casa[]> {
    return this.visitaRepository.casas(id).find(filter);
  }

  @post('/visitas/{id}/casas', {
    responses: {
      '200': {
        description: 'Visita model instance',
        content: {'application/json': {schema: getModelSchemaRef(Casa)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Visita.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Casa, {
            title: 'NewCasaInVisita',
            exclude: ['id'],
            optional: ['casaId']
          }),
        },
      },
    }) casa: Omit<Casa, 'id'>,
  ): Promise<Casa> {
    return this.visitaRepository.casas(id).create(casa);
  }

  @patch('/visitas/{id}/casas', {
    responses: {
      '200': {
        description: 'Visita.Casa PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Casa, {partial: true}),
        },
      },
    })
    casa: Partial<Casa>,
    @param.query.object('where', getWhereSchemaFor(Casa)) where?: Where<Casa>,
  ): Promise<Count> {
    return this.visitaRepository.casas(id).patch(casa, where);
  }

  @del('/visitas/{id}/casas', {
    responses: {
      '200': {
        description: 'Visita.Casa DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Casa)) where?: Where<Casa>,
  ): Promise<Count> {
    return this.visitaRepository.casas(id).delete(where);
  }
}
