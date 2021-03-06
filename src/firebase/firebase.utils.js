import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyA_tSawFkuUC7MFfM8qB1aW6uAgjsJzJiw",
  authDomain: "crown-db-3a5ff.firebaseapp.com",
  databaseURL: "https://crown-db-3a5ff.firebaseio.com",
  projectId: "crown-db-3a5ff",
  storageBucket: "crown-db-3a5ff.appspot.com",
  messagingSenderId: "113138880080",
  appId: "1:113138880080:web:ad325ab0c7305b8e3fcb55",
  measurementId: "G-TTZH1KF9W9",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  console.log(snapShot.data());

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
