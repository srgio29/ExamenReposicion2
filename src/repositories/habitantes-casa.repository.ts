import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {HabitantesCasa, HabitantesCasaRelations} from '../models';

export class HabitantesCasaRepository extends DefaultCrudRepository<
  HabitantesCasa,
  typeof HabitantesCasa.prototype.id,
  HabitantesCasaRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(HabitantesCasa, dataSource);
  }
}
