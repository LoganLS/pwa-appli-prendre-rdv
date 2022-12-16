import { collection, addDoc, getDocs, query, where, deleteDoc } from 'firebase/firestore'
import { firestore } from '@/plugins/firebase'
import { getClientUID } from './client'
import { createFile } from '@/services/ics'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { RegisterSWData } from "vite-plugin-pwa"

const COLLECTION = 'rdvs'

export interface RDV {
    prestataire_uid: string,
    client_uid: string,
    date: string,
    description: string,
    link?: any,
}

export async function createRdv(rdv: RDV) {
    const uploadResult = await createFile(rdv.date, rdv.description)
    const storage = getStorage()
    const storageRef = ref(storage, uploadResult.ref.name)
    const link = await getDownloadURL(storageRef)
    //rdv.link = uploadResult.ref.fullPath
    rdv.link = link
    await addDoc(collection(firestore, COLLECTION), rdv)
}

export async function deleteRdv(rdv: RDV) {
    const rdvsQuery = query(collection(firestore, COLLECTION), where('date', '==', rdv.date))
    const rdvs = (await getDocs(rdvsQuery)).docs
    rdvs.forEach(async function(doc) {
        const data = doc.data()
        if (data.date === rdv.date && data.client_uid === getClientUID()) {
            await deleteDoc(doc.ref)
        }
    });
}


export async function getRdvs (): Promise<Array<RDV>> {
    const rdvs: Array<RDV> = []
    const collectionRef = query(collection(firestore, COLLECTION), where('client_uid', '==', getClientUID()))
    const docsRdvs = (await getDocs(collectionRef)).docs
    docsRdvs.forEach(doc => {
        const data = doc.data()
        rdvs.push({
            prestataire_uid: data.prestataire_uid,
            client_uid: data.client_uid,
            date: data.date,
            description: data.description,
            link: data.link,
        })
    })

    return rdvs
}