import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeedService } from './seed.service';





@Controller('seed')
export class SeedController {
  
  constructor(
    //Inyectamos el servicio
    private readonly seedService: SeedService,

  ) {}

  @Get()
  executeSeed() {
    //Ejecutamos el metodo del servicio
    return this.seedService.executeSeed();
  }


  

  
}
