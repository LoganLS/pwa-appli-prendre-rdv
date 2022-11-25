import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getDatabase } from 'firebase/database'

export const firebaseApp = initializeApp({
    apiKey: import.meta.env.VITE_API_KEY,
    projectId: import.meta.env.VITE_PROJECT_ID,
})
export const database = getDatabase(firebaseApp)
export const firestore = getFirestore(firebaseApp)
