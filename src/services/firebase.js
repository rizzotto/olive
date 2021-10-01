import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import firebaseConfig from '../firebaseConfig';

firebase.initializeApp(firebaseConfig);

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const firestore = firebase.firestore();
const storage = firebase.storage().ref();

export { googleAuthProvider, firestore, storage };
