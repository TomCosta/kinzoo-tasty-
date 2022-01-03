import { AngularFireDatabase } from '@angular/fire/compat/database';
import { tap, map, switchMap, first } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/compat/app';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStatusService {

  constructor(
    private db: AngularFireDatabase,
    private auth: AngularFireAuth
  ){
    this.updateOnUser().subscribe();
    this.updateOnDisconnect().subscribe();
    this.updateOnIdle();
  }

  getStatus(uid: string) {
    return this.db.object(`status/${uid}`).valueChanges();
  }

  getUser() {
    return this.auth.authState.pipe(first()).toPromise();
  }

  async setStatus(status: string) {
    const user = await this.getUser();
    if (user) {
      return this.db.object(`status/${user.uid}`).update({ status, timestamp: this.timestamp });
    }
  }

  get timestamp() {
    return firebase.default.database.ServerValue.TIMESTAMP;
  }

  updateOnUser() {
    const connection = this.db.object('.info/connected').valueChanges().pipe(
      map(connected => connected ? 'online' : 'offline')
    );

    return this.auth.authState.pipe(
      switchMap(user =>  user ? connection : of('offline')),
      tap(status => this.setStatus(status))
    );
  }

  updateOnDisconnect() {
    return this.auth.authState.pipe(
      tap(user => {
        if (user) {
          this.db.object(`status/${user.uid}`).query.ref.onDisconnect()
            .update({
              status: 'offline',
              timestamp: this.timestamp
            });
        }
      })
    );
  }

  updateOnIdle() {
    document.onvisibilitychange = (e) => {
      if (document.visibilityState === 'hidden') {
        this.setStatus('away');
      } else {
        this.setStatus('online');
      }
    };
  }

  async signOut() {
    localStorage.removeItem('kinzooAccess');
    await this.setStatus('offline');
    return await this.auth.signOut();
  }
}
