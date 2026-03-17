import { Injectable, NotFoundException, InternalServerErrorException, Inject, HttpException, BadRequestException} from "@nestjs/common";
import { IParkingRepositories } from "../../Infrastructure/Repositories/Parking/IParking-repositories";
import { ParkingTicket } from "../../Domain/entities/parking-ticket";
import { ParkingSpot } from "../../Domain/entities/parking-spot";
import { CheckOutDto } from "../dtos/checkout-dto";
import { ParkingTariffService } from "../../Domain/Services/parking-tariff-service";
import { spotStatus } from "../../Domain/enums/spot-status";

@Injectable()
class CheckoutUseCase {
  constructor(
    @Inject(IParkingRepositories)
    private readonly repository: IParkingRepositories,
    private readonly tariffService: ParkingTariffService
  ) {}

  async checkout(datas: CheckOutDto) {
    try {
      if (!datas.id_ticket && !datas.plate) {
        throw new BadRequestException("Informe o id_ticket ou a placa do veículo");
      }

      const ticketData = datas.id_ticket
        ? await this.repository.findTicketById(datas.id_ticket)
        : await this.repository.findActiveTicketByPlate(datas.plate!);
      if (!ticketData) {
        throw new NotFoundException("Ticket não encontrado");
      }
      if(ticketData.check_out_time)
      {
        throw new BadRequestException("Ticket já finalizado")
      }
 
           const ticket = new ParkingTicket(
        ticketData.id,
        ticketData.car_plate,
        ticketData.id_spot_fk,
        ticketData.check_in_time,
        ticketData.check_out_time,
        ticketData.total_price
      );
      const now = new Date();
      const minutes = now.getTime() - ticket.check_in_time.getTime();
      const hours = minutes/(1000 * 60 * 60);

      const totalPrice = this.tariffService.calculate(hours);

      await this.repository.closeTicket(ticket.id, totalPrice);
      ticket.closeTicket(totalPrice);
      await this.repository.closeTicket(ticket.id, totalPrice)

      const spotData = await this.repository.findSpotById(ticket.id_spot_fk);
      if (!spotData) throw new NotFoundException("Vaga não encontrada");

      const spot = new ParkingSpot(spotData.id, spotData.spot_number, spotData.spot_status);
      spot.freeSpot();
      await this.repository.updateSpotStatus(spot.id, spotStatus.LIVRE);

      return {
        success: true,
        statusCode: 200,
        message: "Checkout realizado com sucesso",
        datas: {
          ticket:{
            id: ticket.id,
            car_plate: ticket.car_plate,
            id_spot_fk: ticket.id_spot_fk,
            check_in_time: ticket.check_in_time,
            check_out_time: ticket.check_out_time,
            total_price: Math.round(ticket.total_price!)
          },
        }
      };

    } catch (error: any) {
      if (error instanceof HttpException) {
        console.log(error);
        throw error;
      }
      console.log(error);
      throw new InternalServerErrorException("Ocorreu um erro interno, tente novamente");
    }
  }
}
export{CheckoutUseCase}