import { TripInvite } from '../models/trip-invite';

export var TRIPINVITES: TripInvite[] = [
    { id: 1, requestorId: 1, inviteeId: 2, tripId: 3, status: "Pending" },
    { id: 2, requestorId: 3, inviteeId: 1, tripId: 1, status: "Pending" },
    { id: 3, requestorId: 3, inviteeId: 1, tripId: 2, status: "Pending" }
];

export var NEW_TRIPINVITE_ID: number = 4;