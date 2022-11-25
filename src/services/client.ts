import { collection, addDoc } from 'firebase/firestore'
import { firestore } from '@/plugins/firebase'
import { useCurrentUser } from 'vuefire'

const COLLECTION = 'clients'

export interface Client {
    uid: string,
    city: string,
    zipCode: string,
    address: string,
    description: string,
}

export function getClientUID () {
    return useCurrentUser().value?.uid
}

export async function createClient(client: Client) {
    await addDoc(collection(firestore, COLLECTION), client)
}