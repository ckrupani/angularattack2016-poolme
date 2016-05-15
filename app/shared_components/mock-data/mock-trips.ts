import { Trip } from '../models/trip';

export var TRIPS: Trip[] = [
    {
        id: 1,
        userId: 1,
        vehicleId: 1,
        source: "Hope Farm Circle Bus Stop, State Highway 35, Kadugodi Colony, Kadugodi, Bengaluru, Karnataka, India",
        destination: "Marathalli Bridge, AECS Layout, Bengaluru, Karnataka, India",
        date: "2016-05-26",
        time: "12:00",
        occupancy: 2
    },
    {
        id: 2,
        userId: 1,
        vehicleId: 2,
        source: "ITPL Main Road, B Narayanapura, Bengaluru, Karnataka, India",
        destination: "Koramangala, Bengaluru, Karnataka, India",
        date: "2016-05-22",
        time: "20:00",
        occupancy: 1
    },
    {
        id: 3,
        userId: 2,
        vehicleId: 3,
        source: "ITPL Main Road, B Narayanapura, Bengaluru, Karnataka, India",
        destination: "Koramangala, Bengaluru, Karnataka, India",
        date: "2016-05-18",
        time: "08:00",
        occupancy: 2
    }
];

export var NEW_TRIP_ID: number = 4;