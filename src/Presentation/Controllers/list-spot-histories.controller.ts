import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody, ApiBearerAuth} from '@nestjs/swagger';
import { ListSpotHistoriesUseCase } from "../../Application/useCases/list-spot-histories.usecase";
import { PublicRoute } from "../../Auth/Decorators/public.decorator";

@ApiTags("Parking")
@ApiBearerAuth("accessToken")
@Controller("spots/history")
class ListSpotHistoriesController
{
    constructor(private readonly useCase: ListSpotHistoriesUseCase){}
    @Get()
    @ApiOperation({
        summary: 'Listar historico de estancionamento',
        description: 'Endpoint para historico de estancionamento.',
    })
    async listSpotHistories()
    {
        return await this.useCase.listSpotHistories()
    }

}
export{ListSpotHistoriesController}