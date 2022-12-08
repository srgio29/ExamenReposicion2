import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Visitante} from './visitante.model';
import {Casa} from './casa.model';

@model()
export class Visita extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  fechaEntrada: string;

  @property({
    type: 'string',
    required: true,
  })
  fechaSalida: string;
  @property({
    type: 'string',
    required: true,
  })
  casaId: string;

  @property({
    type: 'string',
    required: true,
  })
  codigoQR: string;

  @property({
    type: 'boolean',
    required: true,
  })
  estado: boolean;

  @belongsTo(() => Visitante)
  visitanteId: string;

  @hasMany(() => Casa, {keyTo: 'casaId'})
  casas: Casa[];

  constructor(data?: Partial<Visita>) {
    super(data);
  }
}

export interface VisitaRelations {
  // describe navigational properties here
}

export type VisitaWithRelations = Visita & VisitaRelations;
