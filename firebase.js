// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVlejn4qxYMMrjMse-4u4y49mc4b0lUks",
  authDomain: "workout-app-1688356579607.firebaseapp.com",
  projectId: "workout-app-1688356579607",
  storageBucket: "workout-app-1688356579607.appspot.com",
  messagingSenderId: "394993422190",
  appId: "1:394993422190:web:f6399340b00af8d0ef7b7f",
  measurementId: "G-N1GHYPYKJE"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// AppRegistry.registerComponent(appName, () => App);
let app;
try {
    app = firebase.initializeApp(firebaseConfig)
    } catch (err) {
    if (!/already exists/.test(err.message)) {
    console.error( err.stack)
    }}
    const Firebase= app;

export default Firebase;