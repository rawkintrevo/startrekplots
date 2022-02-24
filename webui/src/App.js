import logo from './logo.svg';
import './App.css';
import InputForm from "./components/InputForm/InputForm";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyDfjaPWMkSQtr4pd3HaamTlYTx9ctSCUd0",
    authDomain: "tng-ds9-plot-mashups.firebaseapp.com",
    projectId: "tng-ds9-plot-mashups",
    storageBucket: "tng-ds9-plot-mashups.appspot.com",
    messagingSenderId: "899287070686",
    appId: "1:899287070686:web:2c308b32628d5fd3658f4f",
    measurementId: "G-MJW500SR9Y"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <InputForm/>
      </header>

    </div>
  );
}

export default App;
