import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCI_VTBj8inrJWIjIYf_Y7bBpT9aRRQS1o",
	authDomain: "user-app-289f1.firebaseapp.com",
	databaseURL: "https://user-app-289f1.firebaseio.com",
	projectId: "user-app-289f1",
	storageBucket: "user-app-289f1.appspot.com",
	messagingSenderId: "438369021654",
	appId: "1:438369021654:web:8138ce7351d51603c0a377"
};
// Initialize Firebase
initializeApp(firebaseConfig);

// export reference to database
export const db = getFirestore();
