import { Injectable, NotFoundException, InternalServerErrorException, HttpException, ConflictException } from "@nestjs/common";
import { IParkingRepositories } from "../../Infrastructure/Repositories/Parking/IParking-repositories";
import { CheckInDto } from "../dtos/checkin-dto";
import { ParkingTicket } from "../../Domain/entities/parking-ticket";
import { ParkingSpot } from "../../Domain/entities/parking-spot";
import sanitize from "sanitize-html";
import { PrismaService } from "../../Infrastructure/Database/prisma-service";
import { spotStatus } from "../../Domain/enums/spot-status";

@Injectable()
export class CheckInUseCase {
  constructor(
    private readonly repository: IParkingRepositories,
    private readonly prisma: PrismaService
  ) {}

  async checkIn(data: CheckInDto) {
    try {
      const result = await this.prisma.$transaction(async (tx) => {
        const existingTicket = await this.repository.findActiveTicketByPlate(data.plate, tx);
        if (existingTicket)
        {
          throw new ConflictException("Este veículo já está estacionado.");
        }
        const availableSpot = await this.repository.findAvailableSpot(tx);
        if (!availableSpot)
        {
          throw new NotFoundException("Não existem vagas disponíveis no momento.");
        }
        const spot = new ParkingSpot(
          availableSpot.id,
          availableSpot.spot_number,
          availableSpot.spot_status
        );
        spot.occupySpot();

        await this.repository.updateSpotStatus(spot.id, spotStatus.OCUPADO, tx);

        const ticket = new ParkingTicket(0, data.plate, spot.id);
        const savedTicket = await this.repository.createTicket(
          {
            id_spot_fk: spot.id,
            plate: sanitize(ticket.car_plate, {
              allowedAttributes: {},
              allowedClasses: {},
              allowedTags: []
            })
          },
          tx
        );

        return {
          success: true,
          statusCode: 201,
          message: "CheckIn realizado com sucesso.",
          datas: {
            ticket: savedTicket,
            spot: {
              id: spot.id,
              spot_number: spot.spot_number,
              spot_status: spot.spot_status
            }
          }
        };
      });

      return result;

    } catch (error: any) {
      if (error instanceof HttpException) throw error;
      console.error(error);
      throw new InternalServerErrorException("Ocorreu um erro interno, tente novamente.");
    }
  }
}