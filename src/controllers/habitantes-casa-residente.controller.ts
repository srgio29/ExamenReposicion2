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
  HabitantesCasa,
  Residente,
} from '../models';
import {HabitantesCasaRepository} from '../repositories';

export class HabitantesCasaResidenteController {
  constructor(
    @repository(HabitantesCasaRepository) protected habitantesCasaRepository: HabitantesCasaRepository,
  ) { }

  @get('/habitantes-casas/{id}/residentes', {
    responses: {
      '200': {
        description: 'Array of HabitantesCasa has many Residente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Residente)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Residente>,
  ): Promise<Residente[]> {
    return this.habitantesCasaRepository.residentes(id).find(filter);
  }

  @post('/habitantes-casas/{id}/residentes', {
    responses: {
      '200': {
        description: 'HabitantesCasa model instance',
        content: {'application/json': {schema: getModelSchemaRef(Residente)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof HabitantesCasa.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Residente, {
            title: 'NewResidenteInHabitantesCasa',
            exclude: ['id'],
            optional: ['habitantesCasaId']
          }),
        },
      },
    }) residente: Omit<Residente, 'id'>,
  ): Promise<Residente> {
    return this.habitantesCasaRepository.residentes(id).create(residente);
  }

  @patch('/habitantes-casas/{id}/residentes', {
    responses: {
      '200': {
        description: 'HabitantesCasa.Residente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Residente, {partial: true}),
        },
      },
    })
    residente: Partial<Residente>,
    @param.query.object('where', getWhereSchemaFor(Residente)) where?: Where<Residente>,
  ): Promise<Count> {
    return this.habitantesCasaRepository.residentes(id).patch(residente, where);
  }

  @del('/habitantes-casas/{id}/residentes', {
    responses: {
      '200': {
        description: 'HabitantesCasa.Residente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Residente)) where?: Where<Residente>,
  ): Promise<Count> {
    return this.habitantesCasaRepository.residentes(id).delete(where);
  }
}
