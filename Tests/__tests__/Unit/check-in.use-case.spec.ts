import { ConflictException, NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { CheckInUseCase } from "../../../src/Application/useCases/check-in.usecase";
import { IParkingRepositories } from "../../../src/Infrastructure/Repositories/Parking/IParking-repositories";
import { PrismaService } from "../../../src/Infrastructure/Database/prisma-service";
import { spotStatus } from "../../../src/Domain/enums/spot-status";

//poderia ter usado db de teste?
describe("CheckInUseCase", () => {
  let useCase: CheckInUseCase;

  const mockRepository: jest.Mocked<IParkingRepositories> = {
  findActiveTicketByPlate: jest.fn(),
  findAvailableSpot: jest.fn(),
  updateSpotStatus: jest.fn(),
  createTicket: jest.fn(),
  createSpot: jest.fn(),
  findSpotById: jest.fn(),
  findTicketById: jest.fn(),
  closeTicket: jest.fn(),
  listAllAvailableSpots: jest.fn(),
  listActiveTickets: jest.fn(),
  listTicketHistory: jest.fn()
};

  const mockPrisma = {
    $transaction: jest.fn((cb) => cb({})),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new CheckInUseCase(
      mockRepository,
      mockPrisma as unknown as PrismaService
    );
  });

  it("deve lançar ConflictException se o veículo já está estacionado", async () => {
    mockRepository.findActiveTicketByPlate.mockResolvedValue({ id: 1, plate: "LD-11-04" } as any);

    await expect(useCase.checkIn({ plate: "LD-11-04" }))
      .rejects
      .toThrow(ConflictException);
  });

  it("deve lançar NotFoundException se não houver vagas disponíveis", async () => {
    mockRepository.findActiveTicketByPlate.mockResolvedValue(null);
    mockRepository.findAvailableSpot.mockResolvedValue(null);

    await expect(useCase.checkIn({ plate: "LD-11-04" }))
      .rejects
      .toThrow(NotFoundException);
  });

  it("deve realizar o checkin com sucesso", async () => {
    mockRepository.findActiveTicketByPlate.mockResolvedValue(null);
    mockRepository.findAvailableSpot.mockResolvedValue({
      id: 1,
      spot_number: 10,
      spot_status: spotStatus.LIVRE,
    } as any);
    mockRepository.updateSpotStatus.mockResolvedValue(undefined as any);
    mockRepository.createTicket.mockResolvedValue({
      id: 99,
      plate: "ABC-1234",
      id_spot_fk: 1,
    } as any);

    const result = await useCase.checkIn({ plate: "LD-11-04" });

    expect(result.success).toBe(true);
    expect(result.statusCode).toBe(201);
    expect(result.datas.ticket).toBeDefined();
    expect(result.datas.spot.spot_status).toBe(spotStatus.OCUPADO);
    expect(mockRepository.updateSpotStatus).toHaveBeenCalledWith(1, spotStatus.OCUPADO, {});
    expect(mockRepository.createTicket).toHaveBeenCalledWith(
      expect.objectContaining({ plate: "LD-11-04", id_spot_fk: 1 }),
      {}
    );
  });

});