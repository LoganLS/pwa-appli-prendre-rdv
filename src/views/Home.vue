<script setup lang="ts">
import HeaderNav from '@/components/HeaderNav.vue'
import { getRdvs, RDV } from '@/services/rdv'
import { getStorage, ref as refStorage, getDownloadURL } from '@firebase/storage';
import { onMounted, ref } from 'vue';

const rdvs = ref<Array<RDV>>([])
onMounted(async () => {
    rdvs.value = await getRdvs()
})

// async function getStorageUrl(fileName: string) {
//     const storage = getStorage()
//     const storageRef = refStorage(storage, fileName)
//     return await getDownloadURL(storageRef)
// }

</script>

<template>
    <section>
        <HeaderNav />
        <section>
            <h1>Liste RDV</h1>
            <ul>
                <li v-for="rdv in rdvs">
                    <span>{{ rdv.date }}</span>
                    <span v-if="rdv.link" class="ml-5">
                        <a :href="rdv.link" target="_blank" :download="rdv.link">Télécharger le rdv dans son calendrier</a>
                    </span>
                </li>
            </ul>
        </section>
    </section>
</template>
