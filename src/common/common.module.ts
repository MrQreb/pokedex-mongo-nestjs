import { Module } from '@nestjs/common';

import { AxiosAdapter } from './adapters/axios.adapter';


 



@Module({
    
    //Providers => Servicios que se inyectaran en otros modulos
    providers: [AxiosAdapter],

    //Exportamos el servicio para poder inyectarlo en otros modulos
    exports: [AxiosAdapter]
})
export class CommonModule {}
