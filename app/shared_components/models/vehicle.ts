export class Vehicle {
    id: number;
    userId: number; 
    number: string;
    type: string;
    facilities: string[];

    constructor(
        public id: number,
        public userId: number,
        public number: string,
        public type: string,
        public facilities: string[]
    ) {}
}