import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
apiKey: "AIzaSyCL9WpyK4JDwxB2UcAHIK18l_F0qBFK-V0",
  authDomain: "store-89ab2.firebaseapp.com",
  projectId: "store-89ab2",
  storageBucket: "store-89ab2.firebasestorage.app",
  messagingSenderId: "806006004992",
  appId: "1:806006004992:web:88ed832ac6e53d927fe7e5",
  measurementId: "G-GCD429QP0C"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);