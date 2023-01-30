<script setup lang="ts">
import { autoCorrelate } from './autoCorrelate'

function basla() {
  if (!navigator?.mediaDevices?.getUserMedia) {
    console.error('getUserMedia() is not supported by your browser')
  }
  else {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        const source: any = ref(null)
        const audioContext = new AudioContext()
        const analyser = audioContext.createAnalyser()
        analyser.fftSize = 2048
        analyser.minDecibels = -100
        analyser.maxDecibels = -10
        analyser.smoothingTimeConstant = 0.85
        const bufferLength = analyser.frequencyBinCount
        const buffer = new Uint8Array(bufferLength)
        source.value = audioContext.createMediaStreamSource(stream)
        source.value.connect(analyser)
        // console.log('source', source.value),

        const noteStrings = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

        function noteFromPitch(frequency: any) {
          const noteNum = 12 * (Math.log(frequency / 440) / Math.log(2))
          return Math.round(noteNum) + 69
        }

        const autoCorrelateValue = autoCorrelate(buffer, audioContext.sampleRate)
        console.log(noteStrings[noteFromPitch(autoCorrelateValue) % 12])
        console.log()
      })
      .catch((e) => {
        console.log(`${e.name}: ${e.message}`)
      })
  }
}
</script>

<template>
  <div>
    <button @click="basla()">
      baslaa
    </button>
  </div>
</template>

<style scoped>

</style>
