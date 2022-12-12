<script setup lang="ts">
import { ref } from 'vue';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/plugins/firebase'
import router from '@/router'
import { createClient } from '@/services/client'

const email = ref<string>('')
const password = ref<string>('')
const city = ref<string>('')
const zipCode = ref<string>('')
const address = ref<string>('')
const description = ref<string>('')
const loading = ref<boolean>(false)

const errorAuthentication = ref<boolean>(false)
const errorMessage = ref<string>('')

async function submit() {
    try {
        loading.value = true
        const response = await createUserWithEmailAndPassword(auth, email.value, password.value);
        createClient({
            uid: response.user.uid,
            city: city.value,
            zipCode: zipCode.value,
            address: address.value,
            description: description.value
        })
        errorAuthentication.value = false
        router.push('/')
    } catch (err: any) {
        errorAuthentication.value = true
        errorMessage.value = err.message
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <VRow align="center" justify="center">
        <VCol cols="6">
            <h1>Création d'un compte client</h1>
            <div class="d-flex mt-5">
                <p class="text-subtitle-1 mr-2">Déjà un compte ?</p>
                <RouterLink :to="{ name: 'Login' }" class="text-primary font-weight-bold text-subtitle-1">Se connecter</RouterLink>
            </div>
            <VForm @submit.prevent="submit" class="mt-5">
                <VRow justify="center">
                    <VTextField v-model="email" label="Adresse email" />
                </VRow>
                <VRow justify="center">
                    <VTextField v-model="password" label="Mot de passe" type="password" />
                </VRow>
                <VRow justify="center">
                    <VTextField v-model="city" label="Ville" />
                </VRow>
                <VRow justify="center">
                    <VTextField v-model="zipCode" label="Code postal" />
                </VRow>
                <VRow justify="center">
                    <VTextField v-model="address" label="Adresse" />
                </VRow>
                <VRow justify="center">
                    <VTextarea v-model="description" label="Description" />
                </VRow>
                <VRow justify="center">
                    <VCol cols="3" class="pa-0">
                      <VBtn block class="py-6" type="submit" :loading="loading">Créer</VBtn>
                    </VCol>
                </VRow>
                <VRow justify="center" v-if="errorAuthentication">
                    <VCol class="text-center mt-5 text-red font-weight-bold">
                        <p>{{ errorMessage }}</p>
                    </VCol>
                </VRow>
            </VForm>
        </VCol>
    </VRow>
</template>