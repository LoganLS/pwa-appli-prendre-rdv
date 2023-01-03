import { collection, addDoc, getDocs, query, where, deleteDoc } from 'firebase/firestore'
import { firestore } from '@/plugins/firebase'
import { getClientUID } from './client'
import { createFile } from '@/services/ics'
import { getDownloadURL, getStorage, ref } from 'firebase/storage'

const COLLECTION = 'rdvs'
const COLLECTION_TOKEN_PRESTATAIRES = 'prestataires_tokens'

export interface RDV {
    prestataire_uid: string,
    client_uid: string,
    date: string,
    description: string,
    link?: any,
}

interface TokenPrestataire {
    prestataire_uid: string,
    token: string,
}

export async function createRdv(rdv: RDV) {
    const uploadResult = await createFile(rdv.date, rdv.description)
    const storage = getStorage()
    const storageRef = ref(storage, uploadResult.ref.name)
    const link = await getDownloadURL(storageRef)
    rdv.link = link
    await addDoc(collection(firestore, COLLECTION), rdv)
    sendMessagesToPrestataires(rdv)
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

async function getTokensByPrestataireUid (prestataire_uid: string): Promise<Array<TokenPrestataire>> {
    const tokensPrestataires: Array<TokenPrestataire> = []
    const collectionRef = query(collection(firestore, COLLECTION_TOKEN_PRESTATAIRES), where('prestataire_uid', '==', prestataire_uid))
    const docsRdvs = (await getDocs(collectionRef)).docs
    docsRdvs.forEach(doc => {
        const data = doc.data()
        tokensPrestataires.push({
            prestataire_uid: data.prestataire_uid,
            token: data.token,
        })
    })

    return tokensPrestataires
}

async function sendMessagesToPrestataires(rdv: RDV) {
    const tokens = await getTokensByPrestataireUid(rdv.prestataire_uid)
    tokens.forEach(token => {
        const message = {
            notificiation: {
                title: 'Un nouveau rdv a été pris pour le ' + rdv.date,
                body: 'Motif : ' + rdv.description,
            },
            token: token,
        }
    })
}