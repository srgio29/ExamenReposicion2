import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Casa} from './casa.model';
import {Residente} from './residente.model';

@model()
export class HabitantesCasa extends Entity {
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
  residenteId: string;

  @property({
    type: 'string',
    required: true,
  })
  parentesco: string;

  @belongsTo(() => Casa)
  casaId: string;

  @hasMany(() => Residente)
  residentes: Residente[];

  constructor(data?: Partial<HabitantesCasa>) {
    super(data);
  }
}

export interface HabitantesCasaRelations {
  // describe navigational properties here
}

export type HabitantesCasaWithRelations = HabitantesCasa & HabitantesCasaRelations;
