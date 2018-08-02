import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyC2UCcL0SBgB08pxMPXHVfuefMJLVLR7Hw",
  authDomain: "movie-review-c0618.firebaseapp.com",
  databaseURL: "https://movie-review-c0618.firebaseio.com",
  projectId: "movie-review-c0618",
  storageBucket: "",
  messagingSenderId: "47740893280"
};

firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
