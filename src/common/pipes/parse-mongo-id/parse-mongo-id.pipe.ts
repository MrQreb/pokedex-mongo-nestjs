import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

//isValidObjectId => Valida si el valor es un mongo id
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
 
  transform(value: string, metadata: ArgumentMetadata) {
    
    //isValidObjectId => Valida si el valor es un mongo id
    if(!isValidObjectId(value)){
      throw new BadRequestException(`${value} is not a valid mongo id`);
    }
    
   return value;
  }
}
