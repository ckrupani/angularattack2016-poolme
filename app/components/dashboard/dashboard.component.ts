import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, Router } from 'angular2/router';

import { AuthService } from '../../shared_components/services/auth.service';
import { PmAllTripsComponent } from './allTrips/allTrips.component';
import { PmMyTripsComponent } from './myTrips/myTrips.component';
import { PmMyVehiclesComponent } from './myVehicles/myVehicles.component';
import { PmProfileComponent } from './profile/profile.component';

@Component({
    selector: 'pm-dashboard',
    templateUrl: 'app/components/dashboard/dashboard.component.html',
    styleUrls: ['app/components/dashboard/dashboard.component.css'],
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    {
        path: '/allTrips',
        name: 'AllTrips',
        component: PmAllTripsComponent,
        useAsDefault: true
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