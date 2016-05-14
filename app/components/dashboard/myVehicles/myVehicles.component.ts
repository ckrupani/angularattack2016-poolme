import { Component, OnInit, OnDestroy  } from 'angular2/core';

import { AuthService } from '../../../shared_components/services/auth.service';
import { VehicleService } from '../../../shared_components/services/vehicle.service';
import { Vehicle } from '../../../shared_components/models/vehicle';

@Component({
    selector: 'pm-myvehicles',
    templateUrl: 'app/components/dashboard/myVehicles/myVehicles.component.html',
    styleUrls: ['app/components/dashboard/myVehicles/myVehicles.component.css']
})

export class PmMyVehiclesComponent implements OnInit, OnDestroy {
    public newVehicle: Vehicle;
    public myVehicles: Vehicle[];
    public isVehicleRegistrationDone: boolean;
    public isVehicleDeletedDone: boolean;
    public doesVehicleExist: boolean;
    private _subscription: any;

    constructor(
        private _authService: AuthService,
        private _vehicleService: VehicleService
    ) { }

    ngOnInit() {
        this.newVehicle = new Vehicle(0, this._authService.currentUser().id, '', '4-wheeler', []);
        this.isVehicleRegistrationDone = false;
        this.isVehicleDeletedDone = false;
        this.doesVehicleExist = false;
        this.myVehicles = this._vehicleService.getVehicles(this._authService.currentUser().id);

        this._subscription = this._vehicleService.vehiclesChange.subscribe((value) => {
            this.myVehicles = value.filter(v => v.userId === this._authService.currentUser().id);
        });
    }

    setFacilities(checked, facility) {
        if (checked) {
            this.newVehicle.facilities.push(facility);
        } else {
            this.newVehicle.facilities = this.newVehicle.facilities.filter(f => f !== facility);
        }
    }

    registerVehicle() {
        if (this._vehicleService.doesVehicleExist(this.newVehicle)) {
            this.doesVehicleExist = true;
        } else {
            this.doesVehicleExist = false;
            this._vehicleService.create(this.newVehicle);
            this.isVehicleRegistrationDone = true;
            setTimeout(() => {
                this.isVehicleRegistrationDone = false;
                this.newVehicle = new Vehicle(0, this._authService.currentUser().id, '', '4-wheeler', []);
            }, 5000);
        }
    }

    deleteVehicle(vehicleId) {
        this._vehicleService.delete(vehicleId);
        this.isVehicleDeletedDone = true;
        setTimeout(() => {
            this.isVehicleDeletedDone = false;
        }, 5000);
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
}