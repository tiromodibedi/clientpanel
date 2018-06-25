import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from '../../models/Client';

import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };
  disableBalanceOnEdit: boolean;

  // pass in the name of the form into the @ViewChild
  @ViewChild('clientForm') form: any;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private settingsServce: SettingsService
  ) { }

  ngOnInit() {
    // get settings for disabling add balance input on edit
    this.disableBalanceOnEdit = this.settingsServce.getSettings().disableBalanceOnEdit;
    // get id from url
    this.id = this.route.snapshot.params['id'];
    // get client
    this.clientService.getClient(this.id).subscribe((dataPayLoad) => {
      this.client = dataPayLoad;
    });
  }

  // onsubmission of form run this function
  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    if (!valid) {
      this.flashMessage.show('Please Fillout the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      // add id to client
      value.id = this.id;
      // update the client in the database
      this.clientService.updateClient(value);
      this.flashMessage.show('Client Updated', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate([`/client/${this.id}`]);
    }
  }

}
