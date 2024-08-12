import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDdzi6aeSVn41TPdTrJ4EdalZeophNO8LI",
    authDomain: "curso-c4be0.firebaseapp.com",
    projectId: "curso-c4be0",
    storageBucket: "curso-c4be0.appspot.com",
    messagingSenderId: "810853739013",
    appId: "1:810853739013:web:1d26062767ec6522df0a6c",
    measurementId: "G-M82Z4TPWFR"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);

    export {db, auth};