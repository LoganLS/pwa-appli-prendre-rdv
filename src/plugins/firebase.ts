import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'
import { getMessaging } from 'firebase/messaging'

export const firebaseApp = initializeApp({
    apiKey: import.meta.env.VITE_API_KEY,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
})
export const database = getDatabase(firebaseApp)
export const firestore = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)
export const messaging = getMessaging();
// user, token device=> dans une table firebase