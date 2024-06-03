import { Injectable } from '@nestjs/common';


import { PokeResponse } from './interfaces/poke-reponse.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

//Importamos el patron adaptador
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';


@Injectable()
export class SeedService {
  


  constructor(
    
    //Inyectamos el modelo de la base de datos para el SEED

    // InjectModel => Permite inyectar el modelo de la base de datos
    // (Pokemon.name) => Nombre de la clase
    @InjectModel(Pokemon.name) 
    private readonly pokemonModel: Model<Pokemon>,

    //Inyecxion del patron adaptador
    //Axios con patron adaptador
    private readonly http:AxiosAdapter,

  ) {}


  //Metodo para hacer la peticion http
  async executeSeed() {

    //Eliminar pokemnos de la base de datos
    await this.pokemonModel.deleteMany({}); //delete * from pokemon;

    //Hacemos la peticion http a la api de pokemon
    const  data  = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    //TODO NOTA: Formar mas rapida de insertar en la base de datos
    //Array para almacenar los pokemones a insertar
    const pokemonToInsert: { name:string, no:number }[] = [];


    //data.results => Array de objetos con la informacion de los pokemones
    //desestructuramos el objeto para obtener el nombre y la url

    //async en forEach => Permite hacer peticiones asincronas 
    data.results.forEach(  ( {name, url }) =>{
     
      //TODO NOTA:  no y name deben llamarse igual que en la base de datos
     

      //Separamos la url por el caracter /
     const spaces = url.split('/');
     
     //Obtenemos el id del pokemon
     const no:number = +spaces[ spaces.length - 2 ] ;
    

     

     //Insertamos el pokemon en el array
      pokemonToInsert.push({ name, no });     
    })

    //Insertamos los pokemones en la base de datos en un solo query
    //insert into pokemons (name, no) values ('pikachu', 1), ('charmander', 2), ('bulbasaur', 3) ....
    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed executed';
  }
}
