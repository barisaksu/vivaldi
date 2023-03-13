<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTonalityGuessingStore } from '~/store/tonalityguessing.store'

const tonalityGuessingStore = useTonalityGuessingStore()

const { isStarted } = storeToRefs(tonalityGuessingStore)

const WelcomePage = defineAsyncComponent(() => import('./welcome.vue'))
const GamePage = defineAsyncComponent(() => import('./game.vue'))

onMounted(() => {
  console.log('isStarted: ', isStarted.value)
})

onBeforeRouteLeave((to, from, next) => {
  /* console.log('onBeforeRouteLeave called')
  console.log('to: ', to)
  console.log('from: ', from) */
  tonalityGuessingStore.$reset()
  next()
})

const currentComponent = computed(() => {
  return isStarted.value ? GamePage : WelcomePage
})
</script>

<template>
  <div>
    <component :is="currentComponent" />
  </div>
</template>

<style scoped>

</style>
