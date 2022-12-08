import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Visitante, VisitanteRelations} from '../models';

export class VisitanteRepository extends DefaultCrudRepository<
  Visitante,
  typeof Visitante.prototype.id,
  VisitanteRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Visitante, dataSource);
  }
}
