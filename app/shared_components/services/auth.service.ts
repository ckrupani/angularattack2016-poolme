import { Injectable } from 'angular2/core';
import { Subject } from 'rxjs/Subject';

import { USERS, NEW_USER_ID } from '../mock-data/mock-users';
import { User } from '../models/user';

@Injectable()
export class AuthService {
    private _newUserId : number;
    private _users : User[];
    private _currentUser: {};
    public userChange: Subject<any> = new Subject<any>();

    constructor() {
        if (!window.localStorage['pool-me-users']) {
            window.localStorage['pool-me-users'] = JSON.stringify(USERS);
        }
        if (!window.localStorage['pool-me-newUserId']) {
            window.localStorage['pool-me-newUserId'] = NEW_USER_ID;
        }
        if (window.localStorage['pool-me-user']) {
            this._currentUser = JSON.parse(window.localStorage['pool-me-user']).token;
        } else {
            this._currentUser = {};
        }
        this.userChange.next(this._currentUser);
        this._newUserId = +window.localStorage['pool-me-newUserId'];
        this._users = JSON.parse(window.localStorage['pool-me-users']);
    }

    saveToken(token) {
        window.localStorage['pool-me-user'] = JSON.stringify({
            token: token,
            time: Date.now()
        });
    }

    getToken() {
        if (window.localStorage['pool-me-user']) {
            return JSON.parse(window.localStorage['pool-me-user']).token;
        } else {
            return window.localStorage['pool-me-user'];
        }
    }

    isLoggedIn() {

        var token = this.getToken(),
            payload,
            returnValue;

        if (token) {
            /*payload = JSON.parse(this.$window.atob(token.split('.')[1]));

            returnValue = payload.exp > Date.now() / 1000;*/
            returnValue = true;
        } else {
            returnValue = false;
        }

        return returnValue;
    }

    currentUser() {

        var token, payload;

        if(this.isLoggedIn()) {
            return this._currentUser;
            /*token = this.getToken();
            return token;
            payload = JSON.parse(this.$window.atob(token.split('.')[1]));
            return {
                email : payload.email,
                name : payload.name
            };*/
        }
    }

    register(user) {
        user.id = this._newUserId;
        this._newUserId += 1;
        this._users.push(user);
        window.localStorage['pool-me-users'] = JSON.stringify(this._users);
        window.localStorage['pool-me-newUserId'] = this._newUserId;
    }

    doesUserExist(user) {
        return this._users.filter(u => u.email === user.email).length === 1;
    }

    isPasswordValid(user) {
        return this._users.filter(u => u.email === user.email)[0].password === user.password;
    }

    login(user) {
        var currentUser = this._users.filter(u => u.email === user.email)[0];
        this._currentUser = currentUser;
        this.saveToken(currentUser);
        this.userChange.next(this._currentUser);
        /*return this.$http.post('/api/login', user).success(data => {
            this.saveToken(data.token);
        });*/
    }

    logout() {
        window.localStorage.removeItem('pool-me-user');
        this._currentUser = undefined;
        this.userChange.next(this._currentUser);
    }

    getUserById(userId) {
        return this._users.filter(u => u.id === userId)[0];
    }
}