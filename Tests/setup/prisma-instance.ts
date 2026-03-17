import { PrismaService } from "../../src/Infrastructure/Database/prisma-service";
// Jest executa este arquivo antes de todos os testes

const prisma = new PrismaService()
export async function resetDatabase()
{
    if (process.env.NODE_ENV !== 'test')
  {
    throw new Error('resetDatabase só pode rodar em ambiente de teste');
  }
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE
    "tbl_parking_tickets",
    "tbl_parking_spots",
    "tbl_admin"
    RESTART IDENTITY CASCADE;
  `);
}
