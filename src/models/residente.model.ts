import {Entity, model, property} from '@loopback/repository';

@model()
export class Residente extends Entity {
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
    type: 'number',
    required: true,
  })
  telefono: number;


  constructor(data?: Partial<Residente>) {
    super(data);
  }
}

export interface ResidenteRelations {
  // describe navigational properties here
}

export type ResidenteWithRelations = Residente & ResidenteRelations;
