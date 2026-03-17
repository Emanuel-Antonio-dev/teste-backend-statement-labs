import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody, ApiBearerAuth} from '@nestjs/swagger';
import { ListAvailableSpotsUseCase } from "../../Application/useCases/list-available-spots.usecase";

@ApiTags("Parking")
@ApiBearerAuth("accessToken")
@Controller("spots/available")
class ListAvailableSpotsController
{
    constructor(private readonly useCase: ListAvailableSpotsUseCase){}
    @Get()
    @ApiOperation({
        summary: 'Listar Vagas disponiveis',
        description: 'Endpoint para listar as vagas disponiveis.',
    })
    async listAllAvailableSpots()
    {
        return await this.useCase.listAvailableSpots()
    }

}
export{ListAvailableSpotsController}