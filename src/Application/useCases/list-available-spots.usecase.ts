import { Injectable, Inject, InternalServerErrorException, NotFoundException, HttpException} from "@nestjs/common";
import { IParkingRepositories } from "../../Infrastructure/Repositories/Parking/IParking-repositories";

@Injectable()
class ListAvailableSpotsUseCase
{
    constructor(@Inject(IParkingRepositories) private readonly repository: IParkingRepositories){}
    async listAvailableSpots()
    {
        try
        {
            const availableSpot = await this.repository.listAllAvailableSpots();
            if (availableSpot.length === 0)
            {
                throw new NotFoundException("De momento ainda não existem vagas disponíveis, volte mais tarde.");
            }
            return {success: true, statusCode: 200, datas: availableSpot}
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
export{ListAvailableSpotsUseCase}