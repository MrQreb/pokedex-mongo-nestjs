//Axios Instance =>  Para hacer peticiones http
import axios, { AxiosInstance } from 'axios'

// Injectable => para poder inyectar la dependencia en otros servicios
import { Injectable } from '@nestjs/common';
import { HttpAdapter } from '../interfaces/http-adapter.interface';


// Injectable => para poder inyectar la dependencia en otros servicios
@Injectable()

// Envoltorio de axios para realizar peticiones http

export class AxiosAdapter implements HttpAdapter{
    
    //Dependencia del servio para hacer peticiones http
    private axios:AxiosInstance =  axios;

    async get<T>(url: string): Promise<T> {
        
        try{

            const { data } = await this.axios.get<T>(url);
            return data;


        }catch(error){
            throw new Error(error.message);
        }

    }



}