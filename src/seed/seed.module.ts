import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';

//Importamos el modulo de pokemon para el seed
import { PokemonModule } from 'src/pokemon/pokemon.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],

  imports: [
    //Importamos el modulo de pokemon para poder usarlo en el seed
    PokemonModule 
  ]
})
export class SeedModule {}
