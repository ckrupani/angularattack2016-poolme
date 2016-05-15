import { Component, OnInit } from 'angular2/core';

import { AuthService } from '../../../shared_components/services/auth.service';
import { VehicleService } from '../../../shared_components/services/vehicle.service';
import { TripService } from '../../../shared_components/services/trip.service';

@Component({
    selector: 'pm-alltrips',
    templateUrl: 'app/components/dashboard/allTrips/allTrips.component.html',
    styleUrls: ['app/components/dashboard/allTrips/allTrips.component.css']
})

export class PmAllTripsComponent {
    public trips: any;
    public mapOptions: {};
    public maps: {};
    public directionsDisplays: {};
    public directionsServices: any;
    public sourceElement: any;
    public destinationElement: any;
    public source: any;
    public destination: any;

    constructor(
        private _authService: AuthService,
        private _vehicleService: VehicleService,
        private _tripService: TripService
    ) {}

    ngOnInit() {
        this.trips = this._tripService.getAllTrips();
        this.maps = {};
        this.directionsDisplays = {};
        this.directionsServices = {};

        this.trips.forEach(t => {
            t.user = this._authService.getUserById(t.userId);
            t.vehicle = this._vehicleService.getVehicleById(t.vehicleId);
        });

        this.mapOptions = {
            center: new google.maps.LatLng(12.9716, 77.5946),
            zoom: 11,
            mapTypeControl: false
        };
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
}