import { Injectable } from '@angular/core';

import { Settings } from '../models/Settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settings: Settings = {
    allowRegistration: true,
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: true
  };

  constructor() {
    // only get settings from local storage if the settings value is not null
    // if settings from local storage are not null then set the instance object to
    // the settings saved in local storage
    if (localStorage.getItem('settings') != null) {
      this.settings = JSON.parse(localStorage.getItem('settings'));
    }
   }

  getSettings(): Settings {
    return this.settings;
  }

  changeSettings(newSettings: Settings) {
    // local storage only stores strings so we wrap the newSettings object using
    // ..JSON.stringify to get strings
    localStorage.setItem('settings', JSON.stringify(newSettings));
  }

}
