import { Injectable } from 'angular2/core';
import { Subject } from 'rxjs/Subject';

import { VEHICLES, NEW_VEHICLE_ID } from '../mock-data/mock-vehicles';
import { Vehicle } from '../models/vehicle';

@Injectable()
export class VehicleService {
    private _newVehicleId : number;
    private _vehicles : Vehicle[];
    public vehiclesChange: Subject<any> = new Subject<any>();

    constructor() {
        if (!window.localStorage['pool-me-vehicles']) {
            window.localStorage['pool-me-vehicles'] = JSON.stringify(VEHICLES);
        }
        if (!window.localStorage['pool-me-newVehicleId']) {
            window.localStorage['pool-me-newVehicleId'] = NEW_VEHICLE_ID;
        }
        this._newVehicleId = +window.localStorage['pool-me-newVehicleId'];
        this._vehicles = JSON.parse(window.localStorage['pool-me-vehicles']);
    }

    doesVehicleExist(vehicle) {
        return this._vehicles.filter(v => v.userId === vehicle.userId && v.number === vehicle.number).length === 1;
    }

    create(vehicle) {
        vehicle.id = this._newVehicleId;
        this._newVehicleId += 1;
        this._vehicles.push(vehicle);
        this.vehiclesChange.next(this._vehicles);
        window.localStorage['pool-me-vehicles'] = JSON.stringify(this._vehicles);
        window.localStorage['pool-me-newVehicleId'] = this._newVehicleId;
    }

    delete(vehicleId) {
        this._vehicles = this._vehicles.filter(v => v.id !== vehicleId);
        this.vehiclesChange.next(this._vehicles);
        window.localStorage['pool-me-vehicles'] = JSON.stringify(this._vehicles);
    }

    getVehicles(userId) {
        return this._vehicles.filter(v => v.userId === userId);
    }

    getVehicleById(vehicleId) {
        return this._vehicles.filter(v => v.id === vehicleId)[0];
    }
}