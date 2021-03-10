// @ts-nocheck
import firebase from 'firebase/app';
import 'firebase/auth';
import { FIREBASE_CONFIG } from 'rt-constants';

firebase.initializeApp(FIREBASE_CONFIG);
firebase.auth();
export const { auth } = firebase;

export const signUp = (email, pwd) =>
  firebase.auth().createUserWithEmailAndPassword(email, pwd);

export const signIn = async (email, pwd) => {
  const authed = await firebase.auth().signInWithEmailAndPassword(email, pwd);

  return authed;
};

export const signOut = () => {
  localStorage.removeItem('token');
  firebase.auth().signOut();
};

export const getUser = async () => {
  const user = await firebase.auth().currentUser?.getIdTokenResult();

  return user;
};

export const getUserToken = async () => {
  const userToken = await firebase.auth().currentUser?.getIdTokenResult();

  return userToken.token;
};
