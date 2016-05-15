import { Component, OnInit } from 'angular2/core';
import template from './profile.component.html!text';
import './profile.component.css!';

import { AuthService } from '../../../shared_components/services/auth.service';
import { User } from '../../../shared_components/models/user';

@Component({
    selector: 'pm-profile',
    template: template
    // styleUrls: ['app/components/dashboard/profile/profile.component.css']
})

export class PmProfileComponent implements OnInit {
    public user: User;

    constructor(
        private _authService: AuthService
    ) { }

    ngOnInit() {
        this.user = this._authService.currentUser();
    }
}