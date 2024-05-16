import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  


  imports: [
    MongooseModule.forFeature([
        {
          //Crear referencia en base al schema con el nombre de la clases
          name: Pokemon.name, //Nombre de la clase
          schema: PokemonSchema, //Esquema de la clase
        }
    ])
  ],
})
export class PokemonModule {}
