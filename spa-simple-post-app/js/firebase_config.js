// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAS1E3LNYKQnoEJlwzRDJxMcQDfhJsYzlI",
  authDomain: "post-app-cederdorff.firebaseapp.com",
  databaseURL: "https://post-app-cederdorff.firebaseio.com",
  projectId: "post-app-cederdorff",
  storageBucket: "post-app-cederdorff.appspot.com",
  messagingSenderId: "710761082156",
  appId: "1:710761082156:web:e507682fb1e9e540099089"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize Firestore (Database)
const db = firebase.firestore();