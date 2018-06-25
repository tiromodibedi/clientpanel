import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore/';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../models/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  // inject angular firestore as a dependency in the constructor
  constructor(private afs: AngularFirestore) {
    this.clientsCollection = this.afs.collection('clients', ref => ref.orderBy('lastName', 'asc'));
  }

  getClients(): Observable<Client[]> {
    // Get the clients with the id... snapshot changes (learn more @ angular firestore github page)
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    this.clients = this.clientsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Client;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
    return this.clients;
  }

  // add a client to Firebase
  newClient(client: Client) {
    this.clientsCollection.add(client);
  }

  // retrieve a client from Firebase
  getClient(id: string): Observable<Client> {
    this.clientDoc = this.afs.doc<Client>(`clients/${id}`);
    this.client = this.clientDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Client;
        data.id = action.payload.id;
        return data;
      }
    }));

    return this.client;
  }

  // update a client
  updateClient(client: Client) {
    // set clientDoc using the client id extracted from the url
    // extract an angular firestore doc using the client id and update it
    this.clientDoc = this.afs.doc(`clients/${client.id}`);
    // update the client doc
    this.clientDoc.update(client);

    // this can be achieved in one line as shown below
    // (this.afs.doc(`clients/${client.id}`)).update(client);
  }

  // delete a client
  deleteClient(client: Client) {
    this.clientDoc = this.afs.doc(`clients/${client.id}`);
    this.clientDoc.delete();
  }
}
