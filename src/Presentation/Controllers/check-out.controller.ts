import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody, ApiBearerAuth} from '@nestjs/swagger';
import { CheckOutDto } from "../../Application/dtos/checkout-dto";
import { CheckoutUseCase } from "../../Application/useCases/check-out.usecase";
import { PublicRoute } from "../../Auth/Decorators/public.decorator";

@ApiTags("Parking")
@Controller("check-out")
class CheckOutController
{
    constructor(private readonly useCase: CheckoutUseCase){}
    @PublicRoute()
    @Post()
    @ApiOperation({
        summary: 'Registrar CheckOut de uma viatura',
        description: 'Endpoint para registrar o checkOut de uma viatura.',
    })
  @ApiResponse({ status: 201, description: 'CheckOut registrado com sucesso' })
  @ApiResponse({ status: 404, description: 'Ticket não encontrado ou já finalizado' })
  @ApiResponse({ status: 500, description: 'Erro interno ao registrar o checkOut' })
    async checkOut(@Body() body: CheckOutDto)
    {
        return await this.useCase.checkout(body)
    }

}
export{CheckOutController}