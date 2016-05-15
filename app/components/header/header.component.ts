import { Component, OnInit, OnDestroy } from 'angular2/core';
import { Router } from 'angular2/router';
import template from './header.component.html!text';
import './header.component.css!';

import { AuthService } from '../../shared_components/services/auth.service';

@Component({
	selector: 'pm-header',
	template: template
	// styleUrls: ['app/components/header/header.component.css']
})

export class PmHeaderComponent implements OnInit, OnDestroy {
    public currentUserName: string;
    private _subscription: any;

    constructor(
        private _authService: AuthService,
        private _router: Router
    ) {}

    ngOnInit() {
        if (this._authService.isLoggedIn()) {
            this.currentUserName = this._authService.currentUser();
        }
        this._subscription = this._authService.userChange.subscribe((value) => {
            console.log(value); 
            this.currentUserName = value; 
        });
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }

    logout() {
        this._authService.logout();
        this._router.navigate(['Login']);
    }
}