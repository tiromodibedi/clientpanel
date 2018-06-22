import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from '../../models/Client';


@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  // hasBalanace => green if 0 balance and red if they owe money
  hasBalance: boolean = false;
  // showBalanceUpdateInput => show icon that if we click a form pops up to update the balance
  showBalanceUpdateInput: boolean = false;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    // Get id from url
    this.id = this.route.snapshot.params['id'];
    // Get Client
    this.clientService.getClient(this.id).subscribe((dataPayLoad) => {
      // check client from service is not null
      if (dataPayLoad != null) {
        // check client from service does not awe any money
        if (dataPayLoad.balance > 0) {
          // if client from service owes money set the hasbalance value to true
          this.hasBalance = true;
        }
      }
      this.client = dataPayLoad;
      // console.log(this.client);
    });
  }

  updateBalance() {
    // the client object has new values from the form after submit button is clicked
    // console.log(this.client);

    // updateClient() service method is what we will use to do a full update of the client
    // pass in the updated client object from the form submission
    this.clientService.updateClient(this.client);
    this.flashMessage.show('Balance Updated', {
      cssClass: 'alert-success', timeout: 4000
    });
  }

  onDeleteClick() {
    if (confirm('are you sure?')) {
      this.clientService.deleteClient(this.client);
      this.flashMessage.show('Client Removed', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/']);
    }
  }

}
