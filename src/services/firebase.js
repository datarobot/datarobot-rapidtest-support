/* eslint-disable import/prefer-default-export */
import firebase from 'firebase';

import { FIREBASE_CONFIG } from 'rt-constants';

firebase.initializeApp(FIREBASE_CONFIG);

export const { auth } = firebase;

export const signUp = (email, pwd) =>
  firebase.auth().createUserWithEmailAndPassword(email, pwd);

export const signIn = async (email, pwd) => {
  const user = await firebase.auth().signInWithEmailAndPassword(email, pwd);

  return user;
};

export const signOut = () => firebase.auth().signOut();
