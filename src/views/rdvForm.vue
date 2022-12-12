<script setup lang="ts">
import { onMounted, ref } from 'vue'
import HeaderNav from '@/components/HeaderNav.vue'
import { getPrestataires, type Prestataire } from '@/services/prestataire'
import { getClientUID } from '@/services/client'
import { createRdv } from '@/services/rdv'
import router from '@/router'

onMounted(async () => {
    prestataires.value = await getPrestataires()
})

const prestataires = ref<Array<Prestataire>>([])
const prestataire = ref<string>('')
const date = ref<string>('')
const description = ref<string>('')
const loading = ref<boolean>(false)

const errorMessage = ref<string>('')

async function submit() {
    try {
        loading.value = true
        await createRdv({
            prestataire_uid: prestataire.value,
            client_uid: getClientUID() as string,
            date: date.value,
            description: description.value,
        })
        router.push('/')
    } catch (err: any) {
        errorMessage.value = err.message
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <section>
        <HeaderNav />
        <section>
            <h1>Prendre un RDV</h1>
            <VForm  @submit.prevent="submit" class="mt-5">
                <VSelect
                    v-model="prestataire"
                    :items="prestataires"
                    :item-title="(x) => x.firstName + ' ' + x.lastName + ' - ' + x.speciality"
                    :item-value="(x) => x.uid"
                    label="Prestataire"
                    required
                />
                <VTextField
                    v-model="date"
                    type="datetime-local"
                    label="Date"
                    required
                />
                <VTextarea
                    v-model="description"
                    label="Description"
                    required
                />

                <VBtn block class="py-6" type="submit" :loading="loading">Prendre RDV</VBtn>

                <p class="mt-5">{{ errorMessage }}</p>
            </VForm>
        </section>
    </section>
</template>