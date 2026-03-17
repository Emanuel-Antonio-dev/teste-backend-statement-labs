
import { spotStatus } from "../../../Domain/enums/spot-status"
import { Prisma } from "../../../../generated/prisma/client"

abstract class IParkingRepositories
{
  abstract createSpot(data: { number: number, status?: spotStatus }, tx?: Omit<Prisma.TransactionClient, "$transaction">): Promise<any>
  abstract findSpotById(id: number, tx?: Omit<Prisma.TransactionClient, "$transaction">): Promise<any>
  abstract findAvailableSpot(tx?: Omit<Prisma.TransactionClient, "$transaction">): Promise<any>
  abstract updateSpotStatus(id: number, status: spotStatus, tx?: Omit<Prisma.TransactionClient, "$transaction">): Promise<any>
  abstract createTicket(data: { plate: string, id_spot_fk: number }, tx?: Omit<Prisma.TransactionClient, "$transaction">): Promise<any>
  abstract findTicketById(id: number, tx?: Omit<Prisma.TransactionClient, "$transaction">): Promise<any>
  abstract findActiveTicketByPlate(plate: string, tx?: Omit<Prisma.TransactionClient, "$transaction">): Promise<any>
  abstract closeTicket(id: number, totalPrice: number, tx?: Omit<Prisma.TransactionClient, "$transaction">): Promise<any>
  abstract listActiveTickets(): Promise<any[]>
  abstract listTicketHistory(): Promise<any[]>
  abstract listAllAvailableSpots():Promise<any[]>
}
export{IParkingRepositories}