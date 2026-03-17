// src/application/dto/checkout.dto.ts
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString, IsNotEmpty } from 'class-validator';

class CheckOutDto {
  @ApiProperty({
    description: 'ID do ticket a ser fechado',
    example: 1,
    required: false
  })
  @IsOptional()
  @IsNumber()
  id_ticket?: number;

  @ApiHideProperty()
  @IsOptional()
  @IsString({message: "A matrícula deve ser uma string"})
  plate?: string;
}
export {CheckOutDto}