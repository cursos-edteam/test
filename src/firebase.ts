import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

declare global {
  interface Window {
    recaptchaVerifier: any,
    confirmationResult: any
  }
}

interface IFirebase {
  apiKey: string,
  authDomain: string,
  projectId: string,
  storageBucket: string,
  messagingSenderId: string,
  appId: string
}

const firebaseConfig: IFirebase = {
  apiKey: 'AIzaSyAkEAIq6FWwkpngHgi1vZNCyeH4fh8krPk',
  authDomain: 'edgram-c0670.firebaseapp.com',
  projectId: 'edgram-c0670',
  storageBucket: 'edgram-c0670.appspot.com',
  messagingSenderId: '507755398988',
  appId: '1:507755398988:web:16e1e60452dd89e26031e9',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().languageCode = 'es';
const db = firebase.firestore();

export {
  db,
  firebase,
};
