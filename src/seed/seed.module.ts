import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';

//Importamos el modulo de pokemon para el seed
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { CommonModule } from 'src/common/common.module';


@Module({
  controllers: [SeedController],
  providers: [SeedService],

  imports: [
    //Importamos el modulo de pokemon para poder usarlo en el seed
    PokemonModule ,


    //Importamos el modulo de common para poder usarlo en el seed 
    //La parte de axios
    CommonModule
  ]
})
export class SeedModule {}
