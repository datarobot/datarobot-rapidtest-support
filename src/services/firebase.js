// @ts-nocheck
/* eslint-disable import/prefer-default-export */
import firebase from 'firebase/app';
import 'firebase/auth';
import { FIREBASE_CONFIG } from 'rt-constants';

firebase.initializeApp(FIREBASE_CONFIG);

export const { auth } = firebase;

export const signUp = (email, pwd) =>
  firebase.auth().createUserWithEmailAndPassword(email, pwd);

export const signIn = async (email, pwd) => {
  const authed = await firebase.auth().signInWithEmailAndPassword(email, pwd);

  return authed;
};

export const signOut = () => firebase.auth().signOut();
