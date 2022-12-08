import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Residente, ResidenteRelations, HabitantesCasa} from '../models';
import {HabitantesCasaRepository} from './habitantes-casa.repository';

export class ResidenteRepository extends DefaultCrudRepository<
  Residente,
  typeof Residente.prototype.id,
  ResidenteRelations
> {

  public readonly habitantesCasa: BelongsToAccessor<HabitantesCasa, typeof Residente.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('HabitantesCasaRepository') protected habitantesCasaRepositoryGetter: Getter<HabitantesCasaRepository>,
  ) {
    super(Residente, dataSource);
    this.habitantesCasa = this.createBelongsToAccessorFor('habitantesCasa', habitantesCasaRepositoryGetter,);
    this.registerInclusionResolver('habitantesCasa', this.habitantesCasa.inclusionResolver);
  }
}
