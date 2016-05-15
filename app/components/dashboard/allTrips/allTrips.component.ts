import { Component, OnInit } from 'angular2/core';

import { AuthService } from '../../../shared_components/services/auth.service';
import { VehicleService } from '../../../shared_components/services/vehicle.service';
import { TripService } from '../../../shared_components/services/trip.service';
import { TripInviteService } from '../../../shared_components/services/trip-invite.service';

@Component({
    selector: 'pm-alltrips',
    templateUrl: 'app/components/dashboard/allTrips/allTrips.component.html',
    styleUrls: ['app/components/dashboard/allTrips/allTrips.component.css']
})

export class PmAllTripsComponent implements OnInit {
    public trips: any;
    public mapOptions: {};
    public maps: {};
    public directionsDisplays: {};
    public directionsServices: any;
    public isTripInviteSent: {};

    constructor(
        private _authService: AuthService,
        private _vehicleService: VehicleService,
        private _tripService: TripService,
        private _tripInviteService: TripInviteService
    ) {}

    ngOnInit() {
        this.trips = this._tripService.getTripsByOtherUsers(this._authService.currentUser().id);
        this.maps = {};
        this.directionsDisplays = {};
        this.directionsServices = {};
        this.isTripInviteSent = {};

        this.trips.forEach(t => {
            t.user = this._authService.getUserById(t.userId);
            t.vehicle = this._vehicleService.getVehicleById(t.vehicleId);
            t.isTripRequested = this._tripInviteService.isTripRequested(t.id, this._authService.currentUser().id);
        });

        this.mapOptions = {
            center: new google.maps.LatLng(12.9716, 77.5946),
            zoom: 11,
            mapTypeControl: false
        };

        this._subscription = this._tripInviteService.tripInvitesChange.subscribe((value) => {
            this.trips.forEach(t => {
                t.isTripRequested = this._tripInviteService.isTripRequested(t.id, this._authService.currentUser().id);
            });
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

    requestRide(invitee, tripId) {
        var tripInvite = {};
        tripInvite.id = 0;
        tripInvite.requestorId = this._authService.currentUser().id;
        tripInvite.inviteeId = invitee.id;
        tripInvite.tripId = tripId;
        tripInvite.status = 'Pending';
        this._tripInviteService.create(tripInvite);
        this.isTripInviteSent = {
            name: invitee.name,
            status: true
        };
        setTimeout(() => {
            this.isTripInviteSent = {};
        }, 5000);
    }
}