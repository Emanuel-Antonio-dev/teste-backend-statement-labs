import { NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { ListAvailableSpotsUseCase } from "../../../src/Application/useCases/list-available-spots.usecase";
import { IParkingRepositories } from "../../../src/Infrastructure/Repositories/Parking/IParking-repositories";

describe("ListAvailableSpotsUseCase", () => {
  let useCase: ListAvailableSpotsUseCase;

  const mockRepository = {
    listAllAvailableSpots: jest.fn(),
  } as unknown as jest.Mocked<IParkingRepositories>;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new ListAvailableSpotsUseCase(mockRepository);
  });

  it("deve lançar NotFoundException se não houver vagas disponíveis", async () => {
    (mockRepository.listAllAvailableSpots as jest.Mock).mockResolvedValue([]);

    await expect(useCase.listAvailableSpots())
      .rejects
      .toThrow(NotFoundException);
  });

  it("deve retornar vagas disponíveis com sucesso", async () => {
    (mockRepository.listAllAvailableSpots as jest.Mock).mockResolvedValue([
      { id: 1, spot_number: 1 },
      { id: 2, spot_number: 2 },
    ]);

    const result = await useCase.listAvailableSpots();

    expect(result.success).toBe(true);
    expect(result.statusCode).toBe(200);
    expect(result.datas).toHaveLength(2);
  });

});