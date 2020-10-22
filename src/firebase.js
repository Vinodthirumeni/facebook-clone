import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDFG7_nSc7dBdGSSUQteUCqT9q_vqPvCf0",
  authDomain: "fb-clone-4a204.firebaseapp.com",
  databaseURL: "https://fb-clone-4a204.firebaseio.com",
  projectId: "fb-clone-4a204",
  storageBucket: "fb-clone-4a204.appspot.com",
  messagingSenderId: "287029522950",
  appId: "1:287029522950:web:025dbdef2f611de494c987",
  measurementId: "G-J9RZ8E8YVD",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();
export { auth, provider, storage };
export default db;


// If firebase expired
// https://console.firebase.google.com/u/0/project/fb-clone-4a204/firestore/rules