//Document => Permite definir la estructura de la base de datos
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
//Schema => Permite definir la estructura de la base de datos
import { Document } from 'mongoose';

//Schema => Dice las reglas de la base de datos
@Schema()
export class Pokemon extends Document {
    
    //id string //Mongo lo da

    //Prop => Para poder buscar por nombre, numero o id
    //Prop permite => definir las columnas de la base de datos

    @Prop({
        unique: true,
        index: true,
    })
    no: number;


    @Prop({
        unique: true,
        index: true,
    })
    name: string;
}

//Schema => reglas , columnas de la base de datos
export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
