import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore,
   doc, 
   getDoc,
    setDoc } from 'firebase/firestore';
// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyDuWSF2X4Xge_9XLZXyCq5bMMt-WW_3Tzc",

  authDomain: "crwn-clothing-db-14b08.firebaseapp.com",

  projectId: "crwn-clothing-db-14b08",

  storageBucket: "crwn-clothing-db-14b08.appspot.com",

  messagingSenderId: "944686595849",

  appId: "1:944686595849:web:b74ccf60f5cdab56629dd8"

};


// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

//Calls Authprovider
//GoogleAuthProvider class from firebase
//U can have multiple different providers

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

//using the databse with auth

export const createUserDocumentFromAuth = async (userAuth) => {
  //docref is reference to the document
  //data is later stored in this reference
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapShot=await getDoc(userDocRef);

    //check if the user data exist
    //return userDocReference

    //if not exist
    //create and set user data
    //snapshot can be used to set the data
  
if(!userSnapShot.exists()){
  const {displayName,email}=userAuth;
  const createdAt=new Date();
  try{
    await setDoc(userDocRef,{displayName,email,createdAt});

  }
  catch(error){
console.log("Error")
  }
}
return userDocRef;

};