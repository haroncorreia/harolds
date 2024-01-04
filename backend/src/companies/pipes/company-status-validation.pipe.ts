import { 
  BadRequestException,
  // ArgumentMetadata, 
  PipeTransform 
} from '@nestjs/common';
import { CompanyStatus } from '../company-status.enum';

export class CompanyStatusValidationPipe implements PipeTransform {

  readonly allowedStatuses = [
    CompanyStatus.ACTIVE,
    CompanyStatus.DEACTIVE,
  ]

  private isValid(status: any) {

    // indexOf retorna -1 se o parâmetro (status) informado 
    // não existir no array (allowedStatuses)
    const i = this.allowedStatuses.indexOf(status)

    // Se o index retornado (i) for diferente de -1, retorna true
    // ou seja, status é válido
    return i !== -1;

  }

  transform(
    value: any, 
    // metadata: ArgumentMetadata
  ) {
    
    // console.log(value);
    // console.log(metadata);

    value = value.toUpperCase();

    if (!this.isValid(value)) 
      throw new BadRequestException(`Company status given (${value}) is not invalid.`)

    return value;

  }
}
