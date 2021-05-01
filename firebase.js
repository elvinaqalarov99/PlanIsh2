import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyCgvD62LMKNZ2Qsgj_gMZoR-4VMdfdxGoI',
  authDomain: 'planish-b46e5.firebaseapp.com',
  projectId: 'planish-b46e5',
  storageBucket: 'planish-b46e5.appspot.com',
  messagingSenderId: '1031453441842',
  appId: '1:1031453441842:web:7360a27ef5feb2d3d0612b',
  measurementId: 'G-321XPT99Q5',
};

let app;

if (firebase.default.apps.length === 0) {
  app = firebase.default.initializeApp(firebaseConfig);
} else {
  app = firebase.default.app();
}
const db = app.firestore();
const auth = app.auth();
const storage = app.storage();
const provider = new firebase.default.auth.GoogleAuthProvider();
const provider1 = new firebase.default.auth.FacebookAuthProvider();

export { db, auth, storage, provider, provider1 };
