import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAAJiPvu1Ax7PvRlyTnR8TYzXcPTdtUYlw",
  authDomain: "flowux-distribuicao.firebaseapp.com",
  projectId: "flowux-distribuicao",
  storageBucket: "flowux-distribuicao.firebasestorage.app",
  messagingSenderId: "389527236112",
  appId: "1:389527236112:web:96cdafca2cdc245043e495",
  measurementId: "G-37DFG9200W"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
