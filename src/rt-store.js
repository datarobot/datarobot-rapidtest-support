import { atom } from 'jotai';

export const authenticatedAtom = atom(false);
export const userAtom = atom({});

export const accountsAtom = atom([]);
export const currentAccountAtom = atom({});
export const sitesAtom = atom([]);
export const currentSiteAtom = atom({});
export const accountsToDisableAtom = atom([]);
export const accountIdsToDisableAtom = atom([]);
export const sitesToDisableAtom = atom([]);
export const siteIdsToDisableAtom = atom([]);

export const startProgramDetails = atom({});

export const accountFilterAtom = atom('');
export const headerCellCheckedAtom = atom(false);
