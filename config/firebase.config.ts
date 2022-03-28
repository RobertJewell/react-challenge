import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyBYRDzCyQrgst-2jhUL-Y01XVBHPLiEMfQ",
	authDomain: "test-project-b4194.firebaseapp.com",
	projectId: "test-project-b4194",
	storageBucket: "test-project-b4194.appspot.com",
	messagingSenderId: "461719400891",
	appId: "1:461719400891:web:8276ecff9e80e608cbd49e",
};

if (getApps().length === 0) {
	initializeApp(firebaseConfig);
}

const db = getFirestore();

export { db };
