import { Component, OnInit } from 'angular2/core';
import template from './tripInvites.component.html!text';
import './tripInvites.component.css!';

import { AuthService } from '../../../shared_components/services/auth.service';
import { TripService } from '../../../shared_components/services/trip.service';
import { TripInviteService } from '../../../shared_components/services/trip-invite.service';
import { TripInvite } from '../../../shared_components/models/trip-invite';

@Component({
    selector: 'pm-tripinvites',
    template: template
    // styleUrls: ['app/components/dashboard/tripInvites/tripInvites.component.css']
})

export class PmTripInvitesComponent implements OnInit, OnDestroy {
    public myRequests: TripInvite[];
    public myInvites: TripInvite[];
    public isRequestCancelDone: boolean;

    constructor(
        private _authService: AuthService,
        private _tripService: TripService,
        private _tripInviteService: TripInviteService
    ) { }

    ngOnInit() {
        this.myRequests = this._tripInviteService.getTripRequests(this._authService.currentUser().id);
        this.myInvites = this._tripInviteService.getTripInvites(this._authService.currentUser().id);
        this.isRequestCancelDone = false;

        this.myRequests.forEach(req => {
            req.requestor = this._authService.getUserById(req.requestorId);
            req.invitee = this._authService.getUserById(req.inviteeId);
            req.trip = this._tripService.getTripById(req.tripId);
        });

        this.myInvites.forEach(inv => {
            inv.requestor = this._authService.getUserById(inv.requestorId);
            inv.invitee = this._authService.getUserById(inv.inviteeId);
            inv.trip = this._tripService.getTripById(inv.tripId);
        });

        this._subscription = this._tripInviteService.tripInvitesChange.subscribe((value) => {
            this.myRequests = this._tripInviteService.getTripRequests(this._authService.currentUser().id);
            this.myInvites = this._tripInviteService.getTripInvites(this._authService.currentUser().id);

            this.myRequests.forEach(req => {
                req.requestor = this._authService.getUserById(req.requestorId);
                req.invitee = this._authService.getUserById(req.inviteeId);
                req.trip = this._tripService.getTripById(req.tripId);
            });

            this.myInvites.forEach(inv => {
                inv.requestor = this._authService.getUserById(inv.requestorId);
                inv.invitee = this._authService.getUserById(inv.inviteeId);
                inv.trip = this._tripService.getTripById(inv.tripId);
            });
        });
    }

    cancelRequest(tripInviteId) {
        this._tripInviteService.delete(tripInviteId);
        this.isRequestCancelDone = true;
        setTimeout(() => {
            this.isRequestCancelDone = false;
        }, 5000);
    }

    approveRequest(tripInviteId) {
        this._tripInviteService.approveTripInvite(tripInviteId);
    }

    rejectRequest(tripInviteId) {
        this._tripInviteService.rejectTripInvite(tripInviteId);
    }
}