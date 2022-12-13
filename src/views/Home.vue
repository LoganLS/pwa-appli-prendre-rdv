<script setup lang="ts">
import HeaderNav from '@/components/HeaderNav.vue'
import { getRdvs, RDV } from '@/services/rdv'
import { onMounted, ref } from 'vue';
import * as dayjs from 'dayjs'

const rdvs = ref<Array<RDV>>([])
onMounted(async () => {
    rdvs.value = await getRdvs()
})

function getDay(date: string): string {
    return dayjs(date).format('DD/MM/YYYY à HH:mm')
}

</script>

<template>
    <section>
        <HeaderNav />
        <section>
            <h1>Liste de mes RDVs</h1>
            <ul>
                <li v-for="rdv in rdvs">
                    <span>{{ getDay(rdv.date) }}</span>
                    <span v-if="rdv.link" class="ml-5">
                        <a :href="rdv.link" target="_blank" :download="rdv.link">Télécharger le rdv dans son calendrier</a>
                    </span>
                </li>
            </ul>
        </section>
    </section>
</template>
