import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

import { isValidObjectId, Model } from 'mongoose'; //permite definir el tipo de dato que se va a guardar en la base de datos
import { Pokemon } from './entities/pokemon.entity'; // Importar la entidad Pokemon
import { InjectModel } from '@nestjs/mongoose'; // Add the missing import

@Injectable()
export class PokemonService {
  constructor(
   
    // InjectModel => Permite inyectar el modelo de la base de datos
    // (Pokemon.name) => Nombre de la clase
    @InjectModel(Pokemon.name) 
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {

    try{
      
      createPokemonDto.name = createPokemonDto.name.toLowerCase();
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;

    }catch(error){
     
      if(error.code === 11000 ){
        throw new BadRequestException(`Pokemon: "${ JSON.stringify(error.keyValue)}" already exists`);
      }
      throw new InternalServerErrorException('Cannot create pokemon - Check server logs');

    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  //Busca en base id, mongo id o nombre
  async findOne(term: string) {
    
    let pokemon : Pokemon;

    //Por numero
    if ( !isNaN(+term)){
      
      //busco en base al numero
      pokemon = await this.pokemonModel.findOne({ no:term })
    }

    //MongoID
    if( !pokemon && isValidObjectId(term) ){ // Tambien se puede :isMongoId
      pokemon = await this.pokemonModel.findById(term);
    }

    //Name
    if( !pokemon ){
      pokemon = await this.pokemonModel.findOne({ name:term.toLowerCase().trim() })
    }

    //Si no encuentra por alguno de los metodos
    if( !pokemon )
      throw new NotFoundException(`Pokemon with id, name or no "${term}" not found `);


    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    
    //Buscar pokemon
    const pokemon = await this.findOne(term); 

    //Si viene en nombre lo guarda en minisculas
    if( updatePokemonDto.name )
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
    
    //Actualizarlo mediante el servicio
    await pokemon.updateOne(updatePokemonDto);

    //Copiar el pokemon y sobrescribir el DTO
    return {...pokemon.toJSON(), ...updatePokemonDto};
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
function IncyectModel(target: typeof PokemonService, propertyKey: undefined, parameterIndex: 0): void {
  throw new Error('Function not implemented.');
}
