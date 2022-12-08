import {Entity, model, property, hasMany} from '@loopback/repository';
import {Visita} from './visita.model';

@model()
export class Visitante extends Entity {
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
  identificacion: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'boolean',
    required: true,
  })
  sexo: boolean;

  @property({
    type: 'number',
    required: true,
  })
  edad: number;

  @hasMany(() => Visita)
  visitas: Visita[];

  constructor(data?: Partial<Visitante>) {
    super(data);
  }
}

export interface VisitanteRelations {
  // describe navigational properties here
}

export type VisitanteWithRelations = Visitante & VisitanteRelations;
