import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeedService } from './seed.service';

import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-reponse.interface';



@Controller('seed')
export class SeedController {
  
  constructor(
    private readonly seedService: SeedService,

  ) {}

  //Dependencia del servio para hacer peticiones http
  private readonly axios:AxiosInstance =  axios;


  @Get()
  async executeSeed() {
    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10');

    //data.results => Array de objetos con la informacion de los pokemones
    //desestructuramos el objeto para obtener el nombre y la url

    data.results.forEach( ( {name, url }) =>{
      const spaces = url.split('/');
     
     const id:number = +spaces[ spaces.length - 2 ] ;
  
     
    })

    return data.results;
  }

  
}
