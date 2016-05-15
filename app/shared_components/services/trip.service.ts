import { Injectable } from 'angular2/core';
import { Subject } from 'rxjs/Subject';

import { TRIPS, NEW_TRIP_ID } from '../mock-data/mock-trips';
import { Trip } from '../models/trip';

@Injectable()
export class TripService {
    private _newTripId : number;
    private _trips : Trip[];
    public tripsChange: Subject<any> = new Subject<any>();

    constructor() {
        if (!window.localStorage['pool-me-trips']) {
            window.localStorage['pool-me-trips'] = JSON.stringify(TRIPS);
        }
        if (!window.localStorage['pool-me-newTripId']) {
            window.localStorage['pool-me-newTripId'] = NEW_TRIP_ID;
        }
        this._newTripId = +window.localStorage['pool-me-newTripId'];
        this._trips = JSON.parse(window.localStorage['pool-me-trips']);
    }

    doesTripExist(trip) {
        return this._trips.filter(t => { 
            return t.userId === trip.userId 
                    && t.vehicleId === trip.vehicleId 
                    && t.source === trip.source 
                    && t.destination === trip.destination 
                    && t.date === trip.date 
                    && t.time === trip.time 
                    && t.occupancy === trip.occupancy;
        }).length === 1;
    }

    create(trip) {
        trip.id = this._newTripId;
        this._newTripId += 1;
        this._trips.push(trip);
        this.tripsChange.next(this._trips);
        window.localStorage['pool-me-trips'] = JSON.stringify(this._trips);
        window.localStorage['pool-me-newTripId'] = this._newTripId;
    }

    delete(tripId) {
        this._trips = this._trips.filter(t => t.id !== tripId);
        this.tripsChange.next(this._trips);
        window.localStorage['pool-me-trips'] = JSON.stringify(this._trips);
    }

    getTripById(tripId) {
        return this._trips.filter(t => t.id === tripId)[0];
    }

    getTripsByUser(userId) {
        return this._trips.filter(t => t.userId === userId);
    }

    getTripsByOtherUsers(userId) {
        return this._trips.filter(t => t.userId !== userId);
    }

    getAllTrips() {
        return this._trips;
    }
}