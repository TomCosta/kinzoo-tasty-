import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  getIsLogged;
  userData;
  user;

  constructor(
    private firestore: AngularFirestore,
    private aFireAuth: AngularFireAuth,
  ){
  }

  login(email, psw){
    return this.aFireAuth.signInWithEmailAndPassword(email, psw);
  }

  register(email, psw){
    return this.aFireAuth.createUserWithEmailAndPassword(email, psw);
  }

  createProfile(userID, dataUser: User) {
    return this.firestore.collection('Users')
    .doc(userID).set({
      createdAt: Date.now(),
      userID: userID,
      userName: dataUser.userName,
      userMail: dataUser.userMail,
      isOnline: false,
      updatedAt: Date.now()
    }).catch((error)=>{
      console.log('Error: ', error);
    });
  }

  getUserDetails(userID) {
    console.log('getUserDetails(userID) ', userID);
    const query = this.firestore.collection('Users', ref => ref.where('userID', '==', `${userID}`));
    console.log('User: ', query);
    return query.snapshotChanges();
  }

  recoverPassword(email) {
    return this.aFireAuth.sendPasswordResetEmail(email);
  }

  async currentUser(){
    return this.aFireAuth.currentUser;
  }

  isLogged(){
    return !!localStorage.getItem('kinzooAccess');
  }
}
