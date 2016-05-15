import { Component, OnInit, OnDestroy } from 'angular2/core';
import template from './myTrips.component.html!text';
import './myTrips.component.css!';

import { AuthService } from '../../../shared_components/services/auth.service';
import { VehicleService } from '../../../shared_components/services/vehicle.service';
import { TripService } from '../../../shared_components/services/trip.service';

@Component({
    selector: 'pm-mytrips',
    template: template
    // styleUrls: ['app/components/dashboard/myTrips/myTrips.component.css']
})

export class PmMyTripsComponent implements OnInit, OnDestroy {
    public trips: any;
    public mapOptions: {};
    public maps: {};
    public directionsDisplays: {};
    public directionsServices: any;
    public isTripDeletedDone: boolean;
    private _subscription: any;

    constructor(
        private _authService: AuthService,
        private _vehicleService: VehicleService,
        private _tripService: TripService
    ) {}

    ngOnInit() {
        this.trips = this._tripService.getTripsByUser(this._authService.currentUser().id);
        this.maps = {};
        this.directionsDisplays = {};
        this.directionsServices = {};
        this.isTripDeletedDone = false;

        this.trips.forEach(t => {
            t.user = this._authService.getUserById(t.userId);
            t.vehicle = this._vehicleService.getVehicleById(t.vehicleId);
        });

        this.mapOptions = {
            center: new google.maps.LatLng(12.9716, 77.5946),
            zoom: 11,
            mapTypeControl: false
        };

        this._subscription = this._tripService.tripsChange.subscribe((value) => {
            this.trips = value.filter(v => v.userId === this._authService.currentUser().id);
        });
    }

    setDirection(trip, source, destination) {
        if (!this.maps[trip]) {
            this.maps[trip] = new google.maps.Map(document.getElementById("tripMap" + trip), this.mapOptions);
        }
        if (!this.directionsDisplays[trip]) {
            this.directionsDisplays[trip] = new google.maps.DirectionsRenderer({ 'draggable': true });
            this.directionsDisplays[trip].setMap(this.maps[trip]);
        }
        if (!this.directionsServices[trip]) {
            this.directionsServices[trip] = new google.maps.DirectionsService();
        }
        
        var request = {
            origin: source,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING
        };
        this.directionsServices[trip].route(request, (response, status) => {
            if (status == google.maps.DirectionsStatus.OK) {
                this.directionsDisplays[trip].setDirections(response);
            }
        });
    }

    deleteTrip(tripId) {
        this._tripService.delete(tripId);
        this.isTripDeletedDone = true;
        setTimeout(() => {
            this.isTripDeletedDone = false;
        }, 5000);
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
}