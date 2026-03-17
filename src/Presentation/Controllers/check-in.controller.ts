import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody, ApiBearerAuth} from '@nestjs/swagger';
import { CheckInDto } from "../../Application/dtos/checkin-dto";
import { CheckInUseCase } from "../../Application/useCases/check-in.usecase";
import { PublicRoute } from "../../Auth/Decorators/public.decorator";

@ApiTags("Parking")
@Controller("check-in")
class CheckInController
{
    constructor(private readonly useCase: CheckInUseCase){}
    @PublicRoute()
    @Post()
    @ApiOperation({
    summary: 'Registrar CheckIn de uma viatura',
    description: 'Endpoint para registrar o checkIn de uma viatura.',
  })
  @ApiResponse({ status: 201, description: 'CheckIn registrado com sucesso' })
  @ApiResponse({ status: 404, description: 'Sem vagas disponiveis' })
  @ApiResponse({ status: 409, description: 'Viatura já estancionada' })
  @ApiResponse({ status: 500, description: 'Erro interno ao registrar o checkIn' })

    async checkIn(@Body() body: CheckInDto)
    {
        return await this.useCase.checkIn(body)
    }

}
export{CheckInController}