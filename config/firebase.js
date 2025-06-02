// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import Constants from 'expo-constants'
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import AsyncStorage, {} from '@react-native-async-storage/async-storage'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.FIREBASE_API_KEY,
  authDomain: "mizzy-253f0.firebaseapp.com",
  projectId: Constants.expoConfig.extra.FIREBASE_PROJECT_ID,
  storageBucket: "mizzy-253f0.firebasestorage.app",
  messagingSenderId: "500333803394",
  appId: Constants.expoConfig.extra.FIREBASE_APP_ID,
  measurementId: "G-ZMPBMVRMS2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})
export const db = getFirestore(app)