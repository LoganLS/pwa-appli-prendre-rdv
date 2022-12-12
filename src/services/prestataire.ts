import { collection, addDoc, getDoc, getDocs } from 'firebase/firestore'
import { database, firebaseApp, firestore } from '@/plugins/firebase'
import { useCurrentUser } from 'vuefire'

const COLLECTION = 'prestataires'

export interface Prestataire {
    uid: string,
    firstName: string,
    lastName: string,
    speciality: string,
}

export interface Prestataire {
    uid: string,
    firstName: string,
    lastName: string,
    speciality: string,
}

export async function getPrestataires (): Promise<Array<Prestataire>> {
    const prestataires: Array<Prestataire> = []
    const collectionRef = collection(firestore, COLLECTION)
    const docsPrestataires = await (await getDocs(collectionRef)).docs
    docsPrestataires.forEach(doc => {
        const data = doc.data()
        prestataires.push({
            uid: data.uid,
            firstName: data.firstName,
            lastName: data.lastName,
            speciality: data.speciality,
        })
    })

    return prestataires
}