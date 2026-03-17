import { Injectable } from "@nestjs/common";

@Injectable()
class ParkingTariffService {
  calculate(hours: number): number {
    if (hours <= 6) {
        return Math.max(hours * 300, 300);
    }
    return (6 * 300) + ((hours - 6) * 200);
  }
}


export{ParkingTariffService}