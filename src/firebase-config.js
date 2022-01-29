import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDrn_TV9JvbRB2sC5zmJrpsfJp5JFNTJng",
  authDomain: "fir-react-demo-43ec3.firebaseapp.com",
  projectId: "fir-react-demo-43ec3",
  storageBucket: "fir-react-demo-43ec3.appspot.com",
  messagingSenderId: "730715488238",
  appId: "1:730715488238:web:ed37c495e0065e77a018ff",
  measurementId: "G-96YJL7YSV3"
};

const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);