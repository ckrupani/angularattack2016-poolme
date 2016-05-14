import { Component } from 'angular2/core';
import { AuthService } from '../../shared_components/services/auth.service';

@Component({
    selector: 'pm-dashboard',
    templateUrl: 'app/components/dashboard/dashboard.component.html',
    styleUrls: ['app/components/dashboard/dashboard.component.css']
})

export class PmDashboardComponent {
    constructor(
        private _authService: AuthService
    ) { }
}