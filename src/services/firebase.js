// @ts-nocheck
import firebase from 'firebase/app';
import 'firebase/auth';

import { FIREBASE_CONFIG } from 'rt-constants';
import { clearStorage, get } from 'utils';

export const app = {
  WA: firebase.initializeApp(FIREBASE_CONFIG.WA, 'WA'),
  PA: firebase.initializeApp(FIREBASE_CONFIG.PA, 'PA'),
};

export const signUp = (email, pwd) =>
  app[get('program') || 'PA'].auth().createUserWithEmailAndPassword(email, pwd);

export const signIn = async (email, pwd) => {
  const authed = await app[get('program') || 'PA']
    .auth()
    .signInWithEmailAndPassword(email, pwd);

  return authed;
};

export const signOut = () => {
  clearStorage();
  app[get('program') || 'PA'].auth().signOut();
};

export const getUser = async () => {
  const user = await app[get('program') || 'PA']
    .auth()
    .currentUser?.getIdTokenResult();

  return user;
};

export const getUserRefreshToken = async () => {
  const refreshToken = await app[get('program') || 'PA']
    .auth()
    .currentUser?.getIdToken();

  return refreshToken;
};

export const getUserToken = async () => {
  const userToken = await app[get('program') || 'PA']
    .auth()
    .currentUser?.getIdTokenResult();

  return userToken.token;
};
