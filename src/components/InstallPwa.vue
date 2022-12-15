<script setup lang="ts">
import { ref } from 'vue'

const deferredPrompt = ref<any>(null)
window.addEventListener("beforeinstallprompt", e => {
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt.value = e;
});

window.addEventListener("appinstalled", () => {
    deferredPrompt.value = null;
});

async function install() {
    deferredPrompt.value.prompt();
}

</script>

<template>
    <VRow v-if="deferredPrompt">
        <VCol align="center">
            <VBtn @click="install">Installer la PWA</VBtn>
        </VCol>
    </VRow>
</template>