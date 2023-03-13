<script setup lang="ts">
import axios from 'axios'
// import Vue3Lottie from 'vue3-lottie'
// import 'vue3-lottie/dist/style.css'
import { storeToRefs } from 'pinia'
import loadingLottie from '~/lotties/loading.json'

import { useTonalityGuessingStore } from '~/store/tonalityguessing.store'

const tonalityGuessingStore = useTonalityGuessingStore()
const { isLoading, currentSong } = storeToRefs(tonalityGuessingStore)

// reset game if currentSong is not empty
if (currentSong.value.key) {
  tonalityGuessingStore.resetGame()
  isLoading.value = true
}

// async function fetch
async function getSpotify() {
  console.log('getSpotify() fonksiyonu çağrıldı.')
  axios
    .get('/.netlify/functions/spotify')
    .then((res) => {
      console.log(res)
      // set current song
      currentSong.value = {
        name: res.data.name,
        artist: res.data.artist,
        preview_url: res.data.preview_url,
        image_url: res.data.image_url,
        track_id: res.data.track_id,
        key: res.data.key,
        mode: res.data.mode,
      }
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      isLoading.value = false
    })
}

onMounted(() => {
  // show loading screen while fetching data from getSpotify()
  getSpotify()
})
</script>

<template>
  <div class="flex flex-col justify-center items-center text-center w-full">
    <Vue3Lottie :animation-data="loadingLottie" :height="400" :width="400" />
    <h1 class="text-3xl font-bold">
      {{ $t('vivaldiforse.tone_guessing.loading_message') }}
    </h1>
  </div>
</template>

<style scoped></style>
