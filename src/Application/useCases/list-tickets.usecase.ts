import { Injectable, Inject, InternalServerErrorException, NotFoundException, HttpException} from "@nestjs/common";
import { IParkingRepositories } from "../../Infrastructure/Repositories/Parking/IParking-repositories";

@Injectable()
class ListallAvailableTicketsUseCase
{
    constructor(@Inject(IParkingRepositories) private readonly repository: IParkingRepositories){}
    async listallAvailableTickets()
    {
        try
        {
            const availableTickets = await this.repository.listActiveTickets();
            if (availableTickets.length === 0)
            {
                throw new NotFoundException("De momento ainda não existem carros estancionados, volte mais tarde.");
            }
            return {success: true, statusCode: 200, datas: availableTickets}
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
export{ListallAvailableTicketsUseCase}