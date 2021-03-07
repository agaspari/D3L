  
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyBxOc8-1Q2mB8wrHeM-eLl4ZS-zYM6DxfU",
    authDomain: "loginreacttest.firebaseapp.com",
    databaseURL: "https://loginreacttest.firebaseio.com",
    projectId: "loginreacttest",
    storageBucket: "loginreacttest.appspot.com",
    messagingSenderId: "170443622398",
    appId: "1:170443622398:web:c383802404841bc322a2af",
    measurementId: "G-WSES8J4RRB"
}

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
    if (!user) return;
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
        const { email, displayName, photoURL } = user;
        try {
            await userRef.set({
                displayName,
                email,
                photoURL,
                ...additionalData
            });
        } catch (error) {
            console.error("Error creating user document", error);
        }
    }
    return getUserDocument(user.uid);
};

export const readSession = () => {
    // const user = window.sessionStorage.getItem(
    //     `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`
    // );
    //if (user) setLoggedIn(true)
}

const getUserDocument = async uid => {
    if (!uid) return null;
    try {
        const userDocument = await firestore.doc(`users/${uid}`).get();
        return {
            uid,
            ...userDocument.data()
        };
    } catch (error) {
        console.error("Error fetching user", error);
    }
};