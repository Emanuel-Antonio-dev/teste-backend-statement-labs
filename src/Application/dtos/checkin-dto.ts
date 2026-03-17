// src/application/dto/checkin.dto.ts
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from "class-validator";


export class CheckInDto {
  @ApiProperty({
    description: 'Placa do veículo que vai entrar no estacionamento',
    example: 'ABC-1234'
  })
  @IsNotEmpty({message:"Informe a matrícula do veiculo"})
  @IsString({message: "A matrícula deve ser uma string"})
  @Length(6, 8, { message: 'Placa deve ter entre 6 e 8 caracteres' })
  plate!: string;

  @ApiHideProperty()
  spotNumber?: number;
}