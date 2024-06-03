import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, Query } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

import { isValidObjectId, Model } from 'mongoose'; //permite definir el tipo de dato que se va a guardar en la base de datos
import { Pokemon } from './entities/pokemon.entity'; // Importar la entidad Pokemon
import { InjectModel } from '@nestjs/mongoose'; // Add the missing import

// Importar el DTO de paginación
import { PaginationDto } from '../common/dto/pagination.dto';
import * as request from 'supertest';

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
     
      this.handleExepections(error);
    }
  }

  async findAll( paginationDto: PaginationDto) {
   
    //Desestructurar el objeto y asignar valores por defecto
    const { limit = 10, offset = 0} = paginationDto;
   
    return await this.pokemonModel.find()
      .limit( limit )
      .skip( offset )
      
      
      .sort({
        //Ordernar de forma ascendente 
        no:1 
      })
      .select('-__v') //Omitir el campo __v
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
    
    try{
     
      //Actualizarlo mediante el servicio
      await pokemon.updateOne(updatePokemonDto);

      //Copiar el pokemon y sobrescribir el DTO
      return {...pokemon.toJSON(), ...updatePokemonDto};

    } catch(error){
      
      this.handleExepections(error);
    }
  }

  async remove(id: string) {
    
    //Usando doble consulta

    //saber si id existe
    // const pokemon = await this.findOne(id);
    // await pokemon.deleteOne();
    // return `pokemon with id/name or number "${id}" deleted succesfully`;

    
    //Validando la elmiminacion con una sola consulta
    //Usando deleteOne y desestructurando el resultado
    const { deletedCount, acknowledged } = await this.pokemonModel.deleteOne({ _id:id });

    //Si se manda que no se elimino ninguno
    if( deletedCount === 0 ){
      throw new BadRequestException(`Pokemon with id/name or number "${id}" not found`);
    }

    return;

  }

  //Exepcion no controlada
  private handleExepections( error:any){
   
    if( error.code === 11000){ 
      throw new BadRequestException(`Pokemon exits in db ${ JSON.stringify(error.keyValue )}`);
    }
      console.log(error);
      throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);
    
  }
}



function IncyectModel(target: typeof PokemonService, propertyKey: undefined, parameterIndex: 0): void {
  throw new Error('Function not implemented.');
}

