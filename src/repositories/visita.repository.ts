import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Visita, VisitaRelations, Visitante, Casa} from '../models';
import {VisitanteRepository} from './visitante.repository';
import {CasaRepository} from './casa.repository';

export class VisitaRepository extends DefaultCrudRepository<
  Visita,
  typeof Visita.prototype.id,
  VisitaRelations
> {

  public readonly visitante: BelongsToAccessor<Visitante, typeof Visita.prototype.id>;

  public readonly casas: HasManyRepositoryFactory<Casa, typeof Visita.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('VisitanteRepository') protected visitanteRepositoryGetter: Getter<VisitanteRepository>, @repository.getter('CasaRepository') protected casaRepositoryGetter: Getter<CasaRepository>,
  ) {
    super(Visita, dataSource);
    this.casas = this.createHasManyRepositoryFactoryFor('casas', casaRepositoryGetter,);
    this.registerInclusionResolver('casas', this.casas.inclusionResolver);
    this.visitante = this.createBelongsToAccessorFor('visitante', visitanteRepositoryGetter,);
    this.registerInclusionResolver('visitante', this.visitante.inclusionResolver);
  }
}
