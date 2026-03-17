import { Injectable } from "@nestjs/common";

@Injectable()
class ParkingTariffService
{
    calculate(hours: number)
    {
        if(hours<=6)
        {
            return hours * 300
        }
        return hours * 300 + (hours - 6) * 200
    }
}
export{ParkingTariffService}