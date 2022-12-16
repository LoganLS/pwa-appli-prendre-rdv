<script setup lang="ts">
import InstallPwa from '@/components/InstallPwa.vue'
import { ref } from 'vue';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/plugins/firebase'
import router from '@/router'

const email = ref<string>('')
const password = ref<string>('')
const loading = ref<boolean>(false)

const errorAuthentication = ref<boolean>(false)
const errorMessage = ref<string>('')

async function submit() {
    try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        errorAuthentication.value = false
        router.push('/')
    } catch (err: any) {
        errorAuthentication.value = true
        errorMessage.value = err.message
    }
}
</script>

<template>
    <VRow align="center" justify="center">
        <VCol cols="6">
            <h1>Espace connexion du client</h1>
            <div class="d-flex mt-5">
                <p class="text-subtitle-1 mr-2">Pas de compte ?</p>
                <RouterLink :to="{ name: 'Register' }" class="text-primary font-weight-bold text-subtitle-1">S'inscrire</RouterLink>
            </div>
            <VForm @submit.prevent="submit" class="mt-5">
                <VRow justify="center">
                    <VTextField v-model="email" label="Adresse email" />
                </VRow>
                <VRow justify="center">
                    <VTextField v-model="password" label="Mot de passe" type="password" />
                </VRow>
                <VRow justify="center">
                    <VCol align="center" class="mb-4">
                      <VBtn type="submit" :loading="loading">Se connecter</VBtn>
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
    <InstallPwa />
</template>