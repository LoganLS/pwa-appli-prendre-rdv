<script setup lang="ts">
import { ref, onMounted } from 'vue'
import LoadingScreen from '@/components/LoadingScreen.vue'
import { RouterView } from 'vue-router'

const isLoading = ref<Boolean>(true)

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 1500)
})
</script>

<template>
  <VApp class="bg-background">
    <LoadingScreen v-if="isLoading" />
    <div v-show="!isLoading">
      <RouterView />
    </div>
  </VApp>
</template>
