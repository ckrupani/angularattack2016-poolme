export class Trip {
    id: number;
    userId: number;
    vehicleId: number; 
    source: string;
    destination: string;
    date: string;
    time: string;
    occupancy: number;

    constructor(
        public id: number,
        public userId: number,
        public vehicleId: number,
        public source: string,
        public destination: string,
        public date: string,
        public time: string,
        public occupancy: number,
    ) {}
}