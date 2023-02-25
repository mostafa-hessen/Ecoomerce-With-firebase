import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage} from "firebase/storage";
import {getFirestore,serverTimestamp} from 'firebase/firestore'
// import {  collection,  } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqoXyqyPdgv_qB1jbHwxhANaJudbr0XYs",
  authDomain: "ecommercefortesting.firebaseapp.com",
  projectId: "ecommercefortesting",
  storageBucket: "ecommercefortesting.appspot.com",
  messagingSenderId: "248272706411",
  appId: "1:248272706411:web:d39e632e4166e6f6cd4a2e"
};


export const app = initializeApp(firebaseConfig);
export const  auth=getAuth()
export const storage = getStorage();
export const db=getFirestore(app)
export const myserverTimestamp=serverTimestamp()
 

