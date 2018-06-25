import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SettingsService } from '../services/settings.service';

@Injectable()
export class RegisterGuard implements CanActivate {
    constructor(
        private router: Router,
        private settingsService: SettingsService
    ) { }

    canActivate(): boolean {
        // authState returns an authentications state
        // if registration is allowed return true
        // if registration is not allowed don't visit the route
        // ..we will be redirected to the login page everytime and return false
        if (this.settingsService.getSettings().allowRegistration) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
