// Import stylesheets
import './style.css';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

import * as firebaseui from 'firebaseui';

// Document elements
const startRsvpButton = document.getElementById('startRsvp');
const guestbookContainer = document.getElementById('guestbook-container');

const form = document.getElementById('leave-message');
const input = document.getElementById('message');
const guestbook = document.getElementById('guestbook');
const numberAttending = document.getElementById('number-attending');
const rsvpYes = document.getElementById('rsvp-yes');
const rsvpNo = document.getElementById('rsvp-no');

var rsvpListener = null;
var guestbookListener = null;

// Add Firebase project configuration object here
const firebaseConfig = { // var firebaseConfig = {};
    apiKey: "AIzaSyA1f6nzZMXrCSObZ_zN03udHtI9UvjXFNA",
    authDomain: "fir-web-codelab-456e1.firebaseapp.com",
    databaseURL: "https://fir-web-codelab-456e1.firebaseio.com",
    projectId: "fir-web-codelab-456e1",
    storageBucket: "fir-web-codelab-456e1.appspot.com",
    messagingSenderId: "124995105714",
    appId: "1:124995105714:web:34f2be5aaad7b8b3612aab"
  };

//apenas se agrega la configuracion de fireBase se descomenta esta linea
firebase.initializeApp(firebaseConfig);

// FirebaseUI config
const uiConfig = {
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  signInOptions: [
    // Email / Password Provider.
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl){
      // Handle sign-in.
      // Return false to avoid redirect.
      return false;
    }
  }
};
//esta linea le dice que vamos a utilizar la autenticacion
const ui = new firebaseui.auth.AuthUI(firebase.auth());
//evento del boton para autenticar
startRsvpButton.addEventListener("click", ()=>{
  if(firebase.auth().currentUser){
    firebase.auth().signOut();
  } else {
    ui.start("#firebaseui-auth-container", uiConfig);
  }
});

firebase.auth().onAuthStateChanged((user)=>{
 if(user){
   startRsvpButton.textContent = "LOGOUT";
   guestbookContainer.style.display = "block";
 }else{
   startRsvpButton.textContent = "RSVP";
   guestbookContainer.style.display = "none";
 }
});

// ..
// Listen to the form submission
form.addEventListener("submit", (e) => {
 // Prevent the default form redirect
 e.preventDefault();
 // Write a new message to the database collection "guestbook"
 firebase.firestore().collection("guestbook").add({
   text: input.value,
   timestamp: Date.now(),
   name: firebase.auth().currentUser.displayName,
   userId: firebase.auth().currentUser.uid
 })
 // clear message input field
 input.value = ""; 
 // Return false to avoid redirect
 return false;
});
