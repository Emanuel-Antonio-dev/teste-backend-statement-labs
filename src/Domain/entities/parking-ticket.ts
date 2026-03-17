class ParkingTicket{
    constructor(
        public id: number,
        public car_plate: string,
        public id_spot_fk: number,
        public check_in_time: Date = new Date(),
        public check_out_time?: Date,
        public total_price?: number
    ){}
    closeTicket(price: number)
    {
        this.check_out_time = new Date()
        this.total_price = price
    }
}
export {ParkingTicket}