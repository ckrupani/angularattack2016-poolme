import { Component, OnInit  } from 'angular2/core';
import { Observable } from 'rxjs/Rx';

import { AuthService } from '../../../shared_components/services/auth.service';
import { VehicleService } from '../../../shared_components/services/vehicle.service';
import { Vehicle } from '../../../shared_components/models/vehicle';
import { TripService } from '../../../shared_components/services/trip.service';
import { Trip } from '../../../shared_components/models/trip';

@Component({
    selector: 'pm-createtrip',
    templateUrl: 'app/components/dashboard/createTrip/createTrip.component.html',
    styleUrls: ['app/components/dashboard/createTrip/createTrip.component.css']
})

export class PmCreateTripComponent implements OnInit {
    public mapOptions: {};
    public map: any;
    public directionsDisplay: any;
    public directionsService: any;
    public sourceElement: any;
    public destinationElement: any;
    public source: any;
    public destination: any;
    public trip: any;
    public currentDate: any;
    public myVehicles: Vehicle[];
    public isTripCreatedDone: boolean;
    public doesTripExist: boolean;

    constructor(
        private _authService: AuthService,
        private _vehicleService: VehicleService,
        private _tripService: TripService
    ) {}

    ngOnInit() {
        this.myVehicles = this._vehicleService.getVehicles(this._authService.currentUser().id);
        this.trip = new Trip(0, this._authService.currentUser().id, this.myVehicles[0].id, '', '', '', '', 0);
        this.isTripCreatedDone = false;
        this.doesTripExist = false;

        this.mapOptions = {
            center: new google.maps.LatLng(12.9716, 77.5946),
            zoom: 11,
            mapTypeControl: false
        };

        this.map = new google.maps.Map(document.getElementById("mapDivId"), this.mapOptions);
        this.directionsService = new google.maps.DirectionsService();
        this.directionsDisplay = new google.maps.DirectionsRenderer({ 'draggable': true });
        this.directionsDisplay.setMap(this.map);
        this.sourceElement = document.getElementById("tripSource");
        this.source = new google.maps.places.SearchBox(this.sourceElement);
        this.destinationElement = document.getElementById("tripDestination");
        this.destination = new google.maps.places.SearchBox(this.destinationElement);

        const sourceStream = Observable.fromEvent(this.sourceElement, 'change')
            .map(function (e) {
                return e.target.value;
            })
            .debounceTime(200)
            .distinctUntilChanged();

        sourceStream.subscribe(input => this.setDirection());

        const destinationStream = Observable.fromEvent(this.destinationElement, 'change')
            .map(function (e) {
                return e.target.value;
            })
            .debounceTime(200)
            .distinctUntilChanged();

        destinationStream.subscribe(input => this.setDirection());

        this.currentDate = moment(Date.now()).format('YYYY-MM-DD');
    }

    setDirection() {
        this.trip.source = this.sourceElement.value;
        this.trip.destination = this.destinationElement.value;

        if (this.trip.source && this.trip.destination) {
            var request = {
                origin: this.trip.source,
                destination: this.trip.destination,
                travelMode: google.maps.TravelMode.DRIVING
            };
            this.directionsService.route(request, (response, status) => {
                if (status == google.maps.DirectionsStatus.OK) {
                    this.directionsDisplay.setDirections(response);
                }
            });
        }
    }

    createTrip() {
        this.trip.vehicle = +this.trip.vehicle;
        if (this._tripService.doesTripExist(this.trip)) {
            this.doesTripExist = true;
            setTimeout(() => {
                this.doesTripExist = false;
            }, 5000);
        } else {
            this.doesTripExist = false;
            this._tripService.create(this.trip);
            this.isTripCreatedDone = true;
            setTimeout(() => {
                this.isTripCreatedDone = false;
                this.trip = new Trip(0, this._authService.currentUser().id, this.myVehicles[0].id, '', '', '', '', 0);
            }, 5000);
        }
    }
}