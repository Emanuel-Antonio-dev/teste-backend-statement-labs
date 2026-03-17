import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody, ApiBearerAuth} from '@nestjs/swagger';
import { ListallAvailableTicketsUseCase } from "../../Application/useCases/list-tickets.usecase";

@ApiTags("Parking")
@ApiBearerAuth("accessToken")
@Controller("/active")
class ListAllAvailableTicketsController
{
    constructor(private readonly useCase: ListallAvailableTicketsUseCase){}
    @Get()
    @ApiOperation({
        summary: 'Listar viaturas estancionadas.',
        description: 'Endpoint para listar viaturas estancionadas.',
    })
    async listAllAvailableTickets()
    {
        return await this.useCase.listallAvailableTickets()
    }

}
export{ListAllAvailableTicketsController}