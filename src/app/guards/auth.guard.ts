import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private afAuth: AngularFireAuth
    ) {}

    canActivate(): Observable<boolean> {
        // authState returns an authentications state
        // if we are logged in auth is true
        // if we are not logged in auth is false and..
        // ..we will be redirected to the login page everytime
        return this.afAuth.authState.pipe(map((auth) => {
            if (!auth) {
                this.router.navigate(['/login']);
                return false;
            } else {
                return true;
            }
        }));
    }
}
