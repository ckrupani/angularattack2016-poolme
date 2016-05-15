export class TripInvite {
    id: number;
    requestorId: number;
    inviteeId: number;
    tripId: number; 
    status: string;

    constructor(
        public id: number,
        public requestorId: number,
        public inviteeId: number,
        public tripId: number,
        public status: string
    ) {}
}