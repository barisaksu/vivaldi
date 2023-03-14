<script setup lang="ts">
import { useAVLine } from 'vue-audio-visual'

import { storeToRefs } from 'pinia'
import { useTonalityGuessingStore } from '~/store/tonalityguessing.store'

const tonalityGuessingStore = useTonalityGuessingStore()
const { currentSong, showGuessing } = storeToRefs(tonalityGuessingStore)

/* -------------------------------------------------------------------------- */
/*                           setup audio visualizer                           */
/* -------------------------------------------------------------------------- */
const player = ref(null)
const canvas = ref(null)
const mySource = ref(currentSong.value.preview_url)
// composable function useAVBars
useAVLine(player, canvas, { src: mySource, canvHeight: 400, canvWidth: 900, barColor: 'lime' })

/* ---------------------------- countdown ----------------------------------- */
const showCountdown = ref(false)
const countdown = ref(0)

const countdownInterval = ref()

onBeforeUnmount(() => {
  clearInterval(countdownInterval.value)
})

function startCountdown() {
  showCountdown.value = true
  const audio = player.value
  const duration = Math.floor(audio.duration)
  let remainingTime = duration
  countdown.value = remainingTime

  countdownInterval.value = setInterval(() => {
    if (remainingTime === 0) {
      clearInterval(countdownInterval.value)
      showCountdown.value = false
      showGuessing.value = true
    }
    else {
      remainingTime--
      countdown.value = remainingTime
    }
  }, 1000)
}
</script>

<template>
  <div class="flex w-full relative">
    <div class="flex flex-col justify-center items-center text-center w-full">
      <!-- {{ currentSong }} -->
      <audio ref="player" :src="currentSong.preview_url" controls autoplay crossorigin="anonymous" class="hidden" @playing="startCountdown" />
      <canvas ref="canvas" />
    </div>

    <div class="absolute top-0 left-0 mt-6">
      <div v-if="showCountdown">
        <h1 class="text-6xl font-bold">
          {{ countdown }}
        </h1>
      </div>
    </div>

    <div class="absolute bottom-0 left-0 mb-4">
      <div class="flex justify-between items-center space-x-4 bg-green-600 rounded-lg p-4">
        <img class="w-28" :src="currentSong.image_url">
        <div>
          <h1 class="text-3xl font-bold">
            {{ currentSong.name }}
          </h1>
          <h4 class="text-lg">
            {{ currentSong.artist }}
          </h4>
          <a class="-mt-2" target="_blank" :href="`https://open.spotify.com/track/${currentSong.track_id}`">
            <img class="w-28" src="/listenOnSpotify.png">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
