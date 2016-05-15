import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router } from 'angular2/router';

import { AuthService } from './shared_components/services/auth.service';
import { VehicleService } from './shared_components/services/vehicle.service';
import { TripService } from './shared_components/services/trip.service';

import { PmHeaderComponent } from './components/header/header.component';
import { PmFooterComponent } from './components/footer/footer.component';
import { PmLoginComponent } from './components/login/login.component';
import { PmDashboardComponent } from './components/dashboard/dashboard.component';

@Component({
    selector: 'pool-me-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    directives: [PmHeaderComponent, ROUTER_DIRECTIVES, PmFooterComponent],
    providers: [
        ROUTER_PROVIDERS,
        AuthService,
        VehicleService,
        TripService
    ]
})

@RouteConfig([
    {
        path: '/login',
        name: 'Login',
        component: PmLoginComponent,
        useAsDefault: true
    },
    {
        path: '/dashboard/...',
        name: 'Dashboard',
        component: PmDashboardComponent
    },
    {
        path: '/**',
        redirectTo: ['Login']
    }
])

export class AppComponent {
    constructor(
        private _authService: AuthService,
        private _router: Router
    ) {
        this._router.subscribe((val) => {
            if (val === 'login' && this._authService.isLoggedIn()) {
                this._router.navigate(['Dashboard']);
            }
        });
    }
}