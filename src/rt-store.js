import { atom } from 'jotai';

export const authenticatedAtom = atom(false);
export const userAtom = atom({});

export const accountsAtom = atom([]);
export const currentAccountAtom = atom({});
export const sitesAtom = atom([]);
export const currentSiteAtom = atom({});
export const accountsToDisableAtom = atom([]);
export const sitesToDisableAtom = atom([]);

export const startProgramDetails = atom({});
