<script setup lang="ts">
import HeaderNav from '@/components/HeaderNav.vue'
import InstallPwa from '@/components/InstallPwa.vue'
import { getRdvs, deleteRdv, RDV } from '@/services/rdv'
import { onMounted, ref } from 'vue';
import dayjs from 'dayjs'

const rdvs = ref<Array<RDV>>([])
onMounted(async () => {
    rdvs.value = await getRdvs()
})

function getDay(date: string): string {
    return dayjs(date).format('DD/MM/YYYY à HH:mm')
}

async function cancelRdv(rdv: RDV) {
    await deleteRdv(rdv)
    rdvs.value = await getRdvs()
}

</script>

<template>
    <section>
        <HeaderNav />
        <section>
            <h1>Liste de mes RDVs</h1>
            <v-table>
                <thead>
                    <tr>
                        <th>Date du RDV</th>
                        <th>Description</th>
                        <th>Lien</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="rdv in rdvs">
                        <td>{{ getDay(rdv.date) }}</td>
                        <td>{{ rdv.description }}</td>
                        <td>
                            <a
                                v-if="rdv.link"
                                :href="rdv.link"
                                :download="rdv.link"
                                target="_blank"
                            >
                                Télécharger le rdv dans son calendrier
                            </a>
                        </td>
                        <td>
                            <VRow>
                                <v-icon title="Annuler le rdv" @click="cancelRdv(rdv)">
                                    mdi-delete
                                </v-icon>
                            </VRow>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </section>
    </section>
</template>
