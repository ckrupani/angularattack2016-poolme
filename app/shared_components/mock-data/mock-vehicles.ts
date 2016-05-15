import { Vehicle } from '../models/vehicle';

export var VEHICLES: Vehicle[] = [
    { id: 1, userId: 1, number: "KA-53-LU-2345", type: "4-wheeler", facilities: ["AC", "Music", "Air-bags"] },
    { id: 2, userId: 1, number: "KA-53-ZA-2193", type: "2-wheeler", facilities: ["Cabinet", "Helmet"] },
    { id: 3, userId: 2, number: "KA-52-OK-6734", type: "4-wheeler", facilities: ["Music"] }
];

export var NEW_VEHICLE_ID: number = 4;