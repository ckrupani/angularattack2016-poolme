import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, Router } from 'angular2/router';
import template from './dashboard.component.html!text';
import './dashboard.component.css!';

import { AuthService } from '../../shared_components/services/auth.service';
import { PmCreateTripComponent } from './createTrip/createTrip.component';
import { PmAllTripsComponent } from './allTrips/allTrips.component';
import { PmTripInvitesComponent } from './tripInvites/tripInvites.component';
import { PmMyTripsComponent } from './myTrips/myTrips.component';
import { PmMyVehiclesComponent } from './myVehicles/myVehicles.component';
import { PmProfileComponent } from './profile/profile.component';

@Component({
    selector: 'pm-dashboard',
    template: template,
    // styleUrls: ['app/components/dashboard/dashboard.component.css'],
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    {
        path: '/createTrip',
        name: 'CreateTrip',
        component: PmCreateTripComponent
    },
    {
        path: '/allTrips',
        name: 'AllTrips',
        component: PmAllTripsComponent,
        useAsDefault: true
    },
    {
        path: '/tripInvites',
        name: 'TripInvites',
        component: PmTripInvitesComponent
    },
    {
        path: '/myTrips',
        name: 'MyTrips',
        component: PmMyTripsComponent
    },
    {
        path: '/myVehicles',
        name: 'MyVehicles',
        component: PmMyVehiclesComponent
    },
    {
        path: '/profile',
        name: 'Profile',
        component: PmProfileComponent
    }
])

export class PmDashboardComponent {
    public currentView: string;

    constructor(
        private _authService: AuthService,
        private _router: Router
    ) {
        this.currentView = 'allTrips';
        this._router.subscribe((val) => {
            console.log(val);
            this.currentView = val;
        });
    }

    setCurrentView(val) {
        this.currentView = val;
    }
}