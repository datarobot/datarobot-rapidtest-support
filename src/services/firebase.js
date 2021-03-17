// @ts-nocheck
import firebase from 'firebase/app';
import 'firebase/auth';
import { FIREBASE_CONFIG } from 'rt-constants';
import { clearStorage } from 'utils';

export const app = firebase.initializeApp(FIREBASE_CONFIG);

export const signUp = (email, pwd) =>
  app.auth().createUserWithEmailAndPassword(email, pwd);

export const signIn = async (email, pwd) => {
  const authed = await app.auth().signInWithEmailAndPassword(email, pwd);

  return authed;
};

export const signOut = () => {
  clearStorage();
  app.auth().signOut();
};

export const getUser = async () => {
  const user = await app.auth().currentUser?.getIdTokenResult();

  return user;
};

export const getUserRefreshToken = async () => {
  const refreshToken = await app.auth().currentUser?.getIdToken();

  return refreshToken;
};

export const getUserToken = async () => {
  const userToken = await app.auth().currentUser?.getIdTokenResult();

  return userToken.token;
};
