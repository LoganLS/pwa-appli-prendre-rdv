<script setup lang="ts">
</script>

<template>
    <VRow>
        <VCol cols="12" class="text-right">
            <VBtn>
                <RouterLink :to="{ name: 'Home' }">Mes RDV</RouterLink>
            </VBtn>

            <VBtn class="ml-15">
                <RouterLink :to="{ name: 'rdvForm' }">Prendre RDV</RouterLink>
            </VBtn>

            <VBtn class="ml-15">
                <RouterLink to="/logout">Se déconnecter</RouterLink>
            </VBtn>
        </VCol>
    </VRow>
</template>