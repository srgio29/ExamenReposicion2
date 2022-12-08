import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Residente, ResidenteRelations} from '../models';

export class ResidenteRepository extends DefaultCrudRepository<
  Residente,
  typeof Residente.prototype.id,
  ResidenteRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Residente, dataSource);
  }
}
