import { BadRequestException } from "@nestjs/common";
import { spotStatus } from "../enums/spot-status";

class ParkingSpot
{
    constructor(public id: number,public spot_number: number, public spot_status: spotStatus = spotStatus.LIVRE){}

    occupySpot()
    {
        if(this.spot_status === spotStatus.OCUPADO)
        {
            throw new BadRequestException("Esta vaga já foi ocupada")
        }
        this.spot_status = spotStatus.OCUPADO
    }
    freeSpot()
    {
        this.spot_status = spotStatus.LIVRE
    }
}
export {ParkingSpot}