import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { AuthService } from '../../shared_components/services/auth.service';
import { User } from '../../shared_components/models/user';

@Component({
    selector: 'pm-login',
    templateUrl: 'app/components/login/login.component.html',
    styleUrls: ['app/components/login/login.component.css']
})

export class PmLoginComponent implements OnInit {
    public newUser: User;
    public loginDetails: {};
    public isRegistrationDone: boolean;
    public doesUserExist: boolean;

    constructor(
        private _authService: AuthService,
        private _router: Router
    ) { }

    ngOnInit() {
        this.newUser = new User(0, '', '', '', '');
        this.loginDetails = {
            email: '',
            password: ''
        };
        this.isRegistrationDone = false;
        this.doesUserExist = true;
    }

    registerUser() {
        this._authService.register(this.newUser);
        this.isRegistrationDone = true;
        setTimeout(() => {
            this.isRegistrationDone = false;
            this.newUser = new User(0, '', '', '', '');
        }, 5000);
    }

    login() {
        if (!this._authService.doesUserExist(this.loginDetails) || !this._authService.isPasswordValid(this.loginDetails)) {
            this.doesUserExist = false;
        } else {
            this.doesUserExist = true;
            this._authService.login(this.loginDetails);
            this._router.navigate(['Dashboard']);
        }
    }
}