import { BadRequestException, NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { CheckoutUseCase } from "../../../src/Application/useCases/check-out.usecase";
import { IParkingRepositories } from "../../../src/Infrastructure/Repositories/Parking/IParking-repositories";
import { ParkingTariffService } from "../../../src/Domain/Services/parking-tariff-service";
import { spotStatus } from "../../../src/Domain/enums/spot-status";

describe("CheckoutUseCase", () => {
  let useCase: CheckoutUseCase;

  const mockRepository = {
    findTicketById: jest.fn(),
    findActiveTicketByPlate: jest.fn(),
    closeTicket: jest.fn(),
    findSpotById: jest.fn(),
    updateSpotStatus: jest.fn(),
  } as unknown as jest.Mocked<IParkingRepositories>;

  const mockTariffService = {
    calculate: jest.fn().mockReturnValue(10),
  } as unknown as ParkingTariffService;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new CheckoutUseCase(mockRepository, mockTariffService);
  });

  it("deve lançar BadRequestException se não informar id_ticket nem plate", async () => {
    await expect(useCase.checkout({} as any))
      .rejects
      .toThrow(BadRequestException);
  });

  it("deve lançar NotFoundException se o ticket não for encontrado", async () => {
    (mockRepository.findTicketById as jest.Mock).mockResolvedValue(null);

    await expect(useCase.checkout({ id_ticket: 99 }))
      .rejects
      .toThrow(NotFoundException);
  });

  it("deve lançar NotFoundException se a vaga não for encontrada", async () => {
    (mockRepository.findTicketById as jest.Mock).mockResolvedValue({
      id: 1,
      car_plate: "LD-12-34",
      id_spot_fk: 1,
      check_in_time: new Date(),
      check_out_time: null,
      total_price: null,
    });
    (mockRepository.closeTicket as jest.Mock).mockResolvedValue(undefined);
    (mockRepository.findSpotById as jest.Mock).mockResolvedValue(null);

    await expect(useCase.checkout({ id_ticket: 1 }))
      .rejects
      .toThrow(NotFoundException);
  });

  it("deve realizar o checkout com sucesso por id_ticket", async () => {
    (mockRepository.findTicketById as jest.Mock).mockResolvedValue({
      id: 1,
      car_plate: "LD-12-34",
      id_spot_fk: 1,
      check_in_time: new Date(),
      check_out_time: null,
      total_price: null,
    });
    (mockRepository.closeTicket as jest.Mock).mockResolvedValue(undefined);
    (mockRepository.findSpotById as jest.Mock).mockResolvedValue({
      id: 1,
      spot_number: 10,
      spot_status: spotStatus.OCUPADO,
    });
    (mockRepository.updateSpotStatus as jest.Mock).mockResolvedValue(undefined);

    const result = await useCase.checkout({ id_ticket: 1 });

    expect(result.success).toBe(true);
    expect(result.statusCode).toBe(200);
    expect(mockRepository.closeTicket).toHaveBeenCalledWith(1, 10);
    expect(mockRepository.updateSpotStatus).toHaveBeenCalledWith(1, spotStatus.LIVRE);
  });

  it("deve realizar o checkout com sucesso por plate", async () => {
    (mockRepository.findActiveTicketByPlate as jest.Mock).mockResolvedValue({
      id: 1,
      car_plate: "LD-12-34",
      id_spot_fk: 1,
      check_in_time: new Date(),
      check_out_time: null,
      total_price: null,
    });
    (mockRepository.closeTicket as jest.Mock).mockResolvedValue(undefined);
    (mockRepository.findSpotById as jest.Mock).mockResolvedValue({
      id: 1,
      spot_number: 10,
      spot_status: spotStatus.OCUPADO,
    });
    (mockRepository.updateSpotStatus as jest.Mock).mockResolvedValue(undefined);

    const result = await useCase.checkout({ plate: "LD-12-34" });

    expect(result.success).toBe(true);
    expect(mockRepository.findActiveTicketByPlate).toHaveBeenCalledWith("LD-12-34");
  });
});