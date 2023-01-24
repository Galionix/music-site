import { initializeApp, getApps } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// export const dbBasePath =
//   process.env.NEXT_PUBLIC_STORE_ID + '/' + process.env.NEXT_PUBLIC_STORE_DOC;

export const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApps()[0];

// export const auth = getAuth();
export const db = getFirestore(firebaseApp);

export const googleAuthProvider = new GoogleAuthProvider();

import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const storage = getStorage(firebaseApp, 'gs://music-dimas.appspot.com');

export function getUrl(url: string, callback?: (url: string) => void) {
  return getDownloadURL(ref(storage, url))
    .then(url => {
      callback && callback(url);
      return url;
    })
    .catch(error => {
      console.error('error: ', error);
      return `${error.message}`;
    });
}
