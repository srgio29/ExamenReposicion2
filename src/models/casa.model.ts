import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Visita} from './visita.model';
import {HabitantesCasa} from './habitantes-casa.model';

@model()
export class Casa extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  numero: number;

  @property({
    type: 'number',
    required: true,
  })
  bloque: number;

  @property({
    type: 'number',
    required: true,
  })
  calle: number;

  @property({
    type: 'string',
    required: true,
  })
  referencia: string;

  @belongsTo(() => Visita)
  casaId: string;

  @hasMany(() => HabitantesCasa)
  habitantesCasas: HabitantesCasa[];

  constructor(data?: Partial<Casa>) {
    super(data);
  }
}

export interface CasaRelations {
  // describe navigational properties here
}

export type CasaWithRelations = Casa & CasaRelations;
