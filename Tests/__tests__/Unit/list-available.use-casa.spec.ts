import { NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { ListallAvailableTicketsUseCase } from "../../../src/Application/useCases/list-tickets.usecase";
import { IParkingRepositories } from "../../../src/Infrastructure/Repositories/Parking/IParking-repositories";

describe("ListallAvailableTicketsUseCase", () => {
  let useCase: ListallAvailableTicketsUseCase;

  const mockRepository = {
    listActiveTickets: jest.fn(),
  } as unknown as jest.Mocked<IParkingRepositories>;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new ListallAvailableTicketsUseCase(mockRepository);
  });

  it("deve lançar NotFoundException se não houver tickets ativos", async () => {
    (mockRepository.listActiveTickets as jest.Mock).mockResolvedValue([]);

    await expect(useCase.listallAvailableTickets())
      .rejects
      .toThrow(NotFoundException);
  });

  it("deve retornar tickets ativos com sucesso", async () => {
    (mockRepository.listActiveTickets as jest.Mock).mockResolvedValue([
      { id: 1, car_plate: "LD-12-34" },
      { id: 2, car_plate: "LD-99-99" },
    ]);

    const result = await useCase.listallAvailableTickets();

    expect(result.success).toBe(true);
    expect(result.statusCode).toBe(200);
    expect(result.datas).toHaveLength(2);
  });

});