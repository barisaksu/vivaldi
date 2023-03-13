<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTonalityGuessingStore } from '~/store/tonalityguessing.store'

const tonalityGuessingStore = useTonalityGuessingStore()

const { isLoading, showGuessing } = storeToRefs(tonalityGuessingStore)

const loadingComponent = defineAsyncComponent(() =>
  import('./loading.vue'),
)
const listenComponent = defineAsyncComponent(() =>
  import('./listen.vue'),
)
const guessingComponent = defineAsyncComponent(() =>
  import('./guessing.vue'),
)

const currentComponent = computed(() => {
  if (isLoading.value)
    return loadingComponent

  else if (showGuessing.value)
    return guessingComponent

  else
    return listenComponent
})
</script>

<template>
  <div class="container px-4 mx-auto h-screen flex">
    <component :is="currentComponent" />
  </div>
</template>

<style scoped>

</style>
