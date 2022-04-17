import { FirebaseOptions, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyCf_5sWGl_lAPIRHkHxOc2lge_ECoHnjiA",
  authDomain: "dogevet-c4861.firebaseapp.com",
  projectId: "dogevet-c4861",
  storageBucket: "dogevet-c4861.appspot.com",
  messagingSenderId: "766631140245",
  appId: "1:766631140245:web:2e2dfa35c95fe26be6b49c",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
