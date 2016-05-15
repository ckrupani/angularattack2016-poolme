import { Injectable } from 'angular2/core';
import { Subject } from 'rxjs/Subject';

import { TRIPINVITES, NEW_TRIPINVITE_ID } from '../mock-data/mock-trip-invites';
import { TripInvite } from '../models/trip-invite';

@Injectable()
export class TripInviteService {
    private _newTripInviteId : number;
    private _tripInvites : TripInvite[];
    public tripInvitesChange: Subject<any> = new Subject<any>();

    constructor() {
        if (!window.localStorage['pool-me-trip-invites']) {
            window.localStorage['pool-me-trip-invites'] = JSON.stringify(TRIPINVITES);
        }
        if (!window.localStorage['pool-me-newTripInviteId']) {
            window.localStorage['pool-me-newTripInviteId'] = NEW_TRIPINVITE_ID;
        }
        this._newTripInviteId = +window.localStorage['pool-me-newTripInviteId'];
        this._tripInvites = JSON.parse(window.localStorage['pool-me-trip-invites']);
    }

    doesTripInviteExist(tripInvite) {
        return this._tripInvites.filter(ti => { 
            return ti.requestorId === tripInvite.requestorId 
                    && ti.inviteeId === tripInvite.inviteeId 
                    && ti.tripId === tripInvite.tripId;
        }).length === 1;
    }

    isTripRequested(tripId, userId) {
        return this._tripInvites.filter(ti => { 
            return ti.requestorId === userId 
                    && ti.tripId === tripId;
        }).length === 1;
    }

    create(tripInvite) {
        tripInvite.id = this._newTripInviteId;
        this._newTripInviteId += 1;
        this._tripInvites.push(tripInvite);
        this.tripInvitesChange.next(this._tripInvites);
        window.localStorage['pool-me-trip-invites'] = JSON.stringify(this._tripInvites);
        window.localStorage['pool-me-newTripInviteId'] = this._newTripInviteId;
    }

    delete(tripInviteId) {
        this._tripInvites = this._tripInvites.filter(ti => ti.id !== tripInviteId);
        this.tripInvitesChange.next(this._tripInvites);
        window.localStorage['pool-me-trips'] = JSON.stringify(this._tripInvites);
    }

    getTripInvites(userId) {
        return this._tripInvites.filter(ti => ti.inviteeId === userId);
    }

    getTripRequests(userId) {
        return this._tripInvites.filter(ti => ti.requestorId === userId);
    }

    approveTripInvite(tripInviteId) {
        this._tripInvites.filter(ti => ti.id === tripInviteId)[0].status = 'Approved';
    }

    rejectTripInvite(tripInviteId) {
        this._tripInvites.filter(ti => ti.id === tripInviteId)[0].status = 'Rejected';
    }
}