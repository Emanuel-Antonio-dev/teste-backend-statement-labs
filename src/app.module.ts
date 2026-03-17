import { Module } from '@nestjs/common';
import { ParkingModule } from './Presentation/parkin.module';
import { AuthModule } from './Auth/auth.module';

@Module({
  imports: [ParkingModule,AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
