import { Module } from '@nestjs/common';
import { CheckInController } from './Controllers/check-in.controller';
import { CheckInUseCase } from '../Application/useCases/check-in.usecase';
import { IParkingRepositories } from '../Infrastructure/Repositories/Parking/IParking-repositories';
import { PrismaParkingRepositories } from '../Infrastructure/Repositories/Parking/prisma-parking-repositories';
import { PrismaService } from '../Infrastructure/Database/prisma-service';
import { CheckOutController } from './Controllers/check-out.controller';
import { CheckoutUseCase } from '../Application/useCases/check-out.usecase';
import { ParkingTariffService } from '../Domain/Services/parking-tariff-service';
import { ListAvailableSpotsController } from './Controllers/list-available-spots.controller';
import { ListSpotHistoriesController } from './Controllers/list-spot-histories.controller';
import { ListSpotHistoriesUseCase } from '../Application/useCases/list-spot-histories.usecase';
import { ListAllAvailableTicketsController } from './Controllers/list-tickets.controller';
import { ListAvailableSpotsUseCase } from '../Application/useCases/list-available-spots.usecase';
import { ListallAvailableTicketsUseCase } from '../Application/useCases/list-tickets.usecase';

@Module({
  imports: [],
  controllers: [
    CheckInController,
    CheckOutController,
    ListAvailableSpotsController,
    ListSpotHistoriesController,
    ListAllAvailableTicketsController
  ],
  providers: [
    PrismaService,
    CheckInUseCase,
    CheckoutUseCase,
    ParkingTariffService,
    ListSpotHistoriesUseCase,
    ListAvailableSpotsUseCase,
    ListallAvailableTicketsUseCase,
    {
        provide: IParkingRepositories,
        useClass: PrismaParkingRepositories
    }
  ],
  exports:[
    IParkingRepositories
  ]
})
export class ParkingModule {}
