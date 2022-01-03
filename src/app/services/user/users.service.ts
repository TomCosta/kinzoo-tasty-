import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from './../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private profileObs$: BehaviorSubject<User>;
  public userUID;

  constructor(
    private firestore: AngularFirestore,
    private db: AngularFireDatabase,
    private auth: AngularFireAuth
  ){
    this.profileObs$ = new BehaviorSubject(null) as BehaviorSubject<User>;
  }

  getUserUID() {
    const userUID = localStorage.getItem('qrUID');
    console.log('$UID: ', userUID);
    return this.userUID = userUID;
  }

  getUsers() {
    return this.firestore.collection('Users').valueChanges();
  }
  
  getUserProfile(userID: string) {
    return this.firestore.collection('Users').doc(userID).ref.get();
  }

  getUserById(userID) {
    const superQuery = this.firestore.collection('Users').doc(userID).valueChanges();
    return superQuery;
  }

  async updateProfile(userID, dataUser: User){
    return await this.firestore
    .doc('Users/' + userID).update({
      createdAt: dataUser.createdAt,
      userID: userID,
      userName: dataUser.userName,
      userMail: dataUser.userMail,
      isOnline: dataUser.isOnline,
      updatedAt: Date.now()
    }).catch((error)=>{
      console.log('Error: ', error);
    });
  }

  getProfileObs(): Observable<User> {
    return this.profileObs$.asObservable() || JSON.parse(localStorage.getItem('userProfile'));
  }

  setProfileObs(profile: User) {
    localStorage.setItem('userProfile', JSON.stringify(profile));    
    this.profileObs$.next(profile);
  }
}
