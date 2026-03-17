import { PrismaService } from "../../Database/prisma-service";
import { Injectable } from "@nestjs/common";
import { IParkingRepositories } from "./IParking-repositories";
import { spotStatus } from "../../../Domain/enums/spot-status";
import { ParkingSpot } from "../../../Domain/entities/parking-spot";
import { ParkingTicket } from "../../../Domain/entities/parking-ticket";
import { Prisma } from "../../../../generated/prisma/client";

@Injectable()
class PrismaParkingRepositories implements IParkingRepositories {

  constructor(private readonly prisma: PrismaService) {}

  async createSpot(
    data: { number: number; status?: spotStatus },
    tx?: Omit<Prisma.TransactionClient, "$transaction">
  ): Promise<any> {

    const client = tx ?? this.prisma

    const status = data.status || spotStatus.LIVRE

    const spot = await client.parkingSpot.create({
      data: {
        spot_number: data.number,
        spot_status: status
      }
    })

    return new ParkingSpot(spot.id, spot.spot_number, status)
  }

  async findAvailableSpot(tx?: Omit<Prisma.TransactionClient, "$transaction">): Promise<any> {

    const client = tx ?? this.prisma
    return await client.parkingSpot.findFirst({
      where: { spot_status: "LIVRE" },
      orderBy: { spot_number: "asc" }
    })
  }

  async findSpotById(id: number, tx?: Omit<Prisma.TransactionClient, "$transaction">): Promise<any> {

    const client = tx ?? this.prisma

    return await client.parkingSpot.findUnique({
      where: { id }
    })
  }

  async updateSpotStatus(
    id: number,
    status: spotStatus,
    tx?: Omit<Prisma.TransactionClient, "$transaction">
  ): Promise<any> {

    const client = tx ?? this.prisma

    return await client.parkingSpot.update({
      where: { id },
      data: { spot_status: status }
    })
  }

  async createTicket(
    data: { plate: string; id_spot_fk: number },
    tx?: Omit<Prisma.TransactionClient, "$transaction">
  ): Promise<any> {

    const client = tx ?? this.prisma

    const ticket = await client.parkingTicket.create({
      data: {
        car_plate: data.plate,
        id_spot_fk: data.id_spot_fk
      }
    })

    return new ParkingTicket(
      ticket.id,
      ticket.car_plate,
      ticket.id_spot_fk,
      ticket.check_in_time
    )
  }

  async findTicketById(id: number, tx?: Omit<Prisma.TransactionClient, "$transaction">): Promise<any> {

    const client = tx ?? this.prisma

    return await client.parkingTicket.findUnique({
      where: { id }
    })
  }

  async findActiveTicketByPlate(
    plate: string,
    tx?: Omit<Prisma.TransactionClient, "$transaction">
  ): Promise<any> {

    const client = tx ?? this.prisma

    return await client.parkingTicket.findFirst({
      where: {
        car_plate: plate,
        check_out_time: null
      }
    })
  }

  async closeTicket(
    id: number,
    totalPrice: number,
    tx?: Omit<Prisma.TransactionClient, "$transaction">
  ): Promise<any> {

    const client = tx ?? this.prisma

    return await client.parkingTicket.update({
      where: { id },
      data: {
        total_price: totalPrice,
        check_out_time: new Date()
      }
    })
  }

  async listActiveTickets(): Promise<any[]> {

    return await this.prisma.parkingTicket.findMany({
      where: { check_out_time: null },
      include: {
        spot: {
          select: {
            id: true,
            spot_number: true,
            spot_status: true,
            created_at: true
          }
        }
      }
    })
  }

  async listTicketHistory(): Promise<any[]> {

    return await this.prisma.parkingTicket.findMany({
      orderBy: { check_in_time: "desc" },
      include: {
        spot: {
          select: {
            id: true,
            spot_number: true,
            spot_status: true,
            created_at: true
          }
        }
      }
    })
  }

  async listAllAvailableSpots(): Promise<any[]> {

    return await this.prisma.parkingSpot.findMany({
      where: { spot_status: "LIVRE" }
    })
  }
}

export { PrismaParkingRepositories }