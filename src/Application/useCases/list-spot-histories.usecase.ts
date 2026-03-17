import { Injectable, Inject, InternalServerErrorException, NotFoundException, HttpException} from "@nestjs/common";
import { IParkingRepositories } from "../../Infrastructure/Repositories/Parking/IParking-repositories";

@Injectable()
class ListSpotHistoriesUseCase
{
    constructor(@Inject(IParkingRepositories) private readonly repository: IParkingRepositories){}
    async listSpotHistories()
    {
        try
        {
            const result = await this.repository.listTicketHistory();
            if (result.length === 0)
            {
                throw new NotFoundException("De momento ainda não existem historicos de estadia.");
            }
            return {success: true, statusCode: 200, datas: result}
        } catch (error: any)
        {
            if(error instanceof HttpException)
                {
                    console.log(error)
                    throw error
                }
                console.log(error)
                throw new InternalServerErrorException("Ocorreu um erro interno, tente novamente");
        }
    }
}
export{ListSpotHistoriesUseCase}