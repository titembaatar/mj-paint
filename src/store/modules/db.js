import firebase from 'firebase/app'
import 'firebase/database'

export const db = firebase
  .initializeApp({
    apiKey: 'AIzaSyD6bcHI_2bkGKcG-1A0usFwJ-aVi-N_cbY',
    authDomain: 'momotarojeanspaint.firebaseapp.com',
    databaseURL: 'https://momotarojeanspaint.firebaseio.com',
    projectId: 'momotarojeanspaint',
    storageBucket: 'momotarojeanspaint.appspot.com',
    messagingSenderId: '758411193582',
    appId: '1:758411193582:web:bb8239cfbd9f984d2217ff'
  })
  .database()
