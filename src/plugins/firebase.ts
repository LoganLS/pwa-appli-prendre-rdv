import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'

export const firebaseApp = initializeApp({
    apiKey: import.meta.env.VITE_API_KEY,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE,
})
export const database = getDatabase(firebaseApp)
export const firestore = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)
