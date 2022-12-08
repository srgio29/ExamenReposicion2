import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Casa, CasaRelations} from '../models';

export class CasaRepository extends DefaultCrudRepository<
  Casa,
  typeof Casa.prototype.id,
  CasaRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Casa, dataSource);
  }
}
