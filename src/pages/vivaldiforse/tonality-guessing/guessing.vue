<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'
import toddlerNo from '~/lotties/toddlerno.json'
import goldenNoteLottie from '~/lotties/goldennote.json'
import { useTonalityGuessingStore } from '~/store/tonalityguessing.store'

const tonalityGuessingStore = useTonalityGuessingStore()
const { currentSong, userGuess, isCorrect, isLoading } = storeToRefs(tonalityGuessingStore)

const noteKeyMap = {
  0: 'C',
  1: 'C♯/D♭',
  2: 'D',
  3: 'D♯/E♭',
  4: 'E',
  5: 'F',
  6: 'F♯/G♭',
  7: 'G',
  8: 'G♯/A♭',
  9: 'A',
  10: 'A♯/B♭',
  11: 'B',
}

// kullanıcı 3 seçenek arasından en fazla 2 defa yanlış seçebilir
const maxWrongGuesses = 2
const wrongGuesses = ref(0)

watch(userGuess, (newValue: number) => {
  if (newValue !== currentSong.value.key) {
    wrongGuesses.value++
  }
})

const isGameOver = computed(() => {
  return wrongGuesses.value >= maxWrongGuesses
})

const answerList = computed(() => {
  const notes = Array.from({ length: 12 }, (_, i) => i)
  const shuffledNotes = shuffleArray(notes)

  const answer = currentSong.value.key
  let distractors = shuffledNotes.filter(note => note !== answer)
  distractors = shuffleArray(distractors).slice(0, 2)

  const answerIndex = Math.floor(Math.random() * 3)
  const startIndex = answerIndex === 0 ? 1 : 0

  const firstTwoOptions = [
    distractors[startIndex],
    distractors[(startIndex + 1) % 2],
  ]

  let options = []
  if (answerIndex === 0)
    options = [answer, ...firstTwoOptions]

  else if (answerIndex === 1)
    options = [firstTwoOptions[0], answer, firstTwoOptions[1]]

  else
    options = [...firstTwoOptions, answer]

  return options
})

function shuffleArray(array) {
  const shuffledArray = [...array]
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = shuffledArray[i]
    shuffledArray[i] = shuffledArray[j]
    shuffledArray[j] = temp
  }
  return shuffledArray
}
</script>

<template>
  <div class="container flex flex-col justify-center text-center items-center">
    <div v-if="isGameOver" class="flex flex-col justify-center items-center w-1/2 space-y-8">
      <Vue3Lottie :animation-data="toddlerNo" :height="200" :width="200" />
      <p class="font-bold text-xl text-red-400">
        {{ $t('vivaldiforse.tone_guessing.wrong_screen_message', { tone: `${noteKeyMap[currentSong.key]} ${currentSong.mode === 1 ? "Major" : "Minor"}` }) }}
        <!-- Hay aksi! Cevap <span class="underline">{{ noteKeyMap[currentSong.key] }} {{ currentSong.mode === 1 ? "Major" : "Minor" }}</span> olmalıydı. -->
      </p>

      <button class="bg-green-500 hover:bg-green-700 text-green-100 font-bold py-2 px-4 rounded w-1/2" @click="isLoading = true">
        {{ $t('vivaldiforse.tone_guessing.wrong_screen_btn') }}
      </button>
    </div>
    <div v-else-if="isCorrect" class="flex flex-col justify-center items-center w-1/2 space-y-8">
      <Vue3Lottie :animation-data="goldenNoteLottie" loop="false" :height="300" :width="300" />
      <p class="font-bold text-xl text-yellow-400">
        {{ $t('vivaldiforse.tone_guessing.win_screen_message') }}
      </p>

      <button class="bg-green-500 hover:bg-green-700 text-green-100 font-bold py-2 px-4 rounded w-1/2" @click="isLoading = true">
        {{ $t('vivaldiforse.tone_guessing.win_screen_btn') }}
      </button>
    </div>
    <div v-else>
      <h1 class="font-bold text-3xl">
        {{ $t('vivaldiforse.tone_guessing.whats_your_guess') }}
      </h1>
      <div class="grid grid-cols-3 gap-3 h-2/3 justify-center items-center text-center self-center content-center justify-self-center w-full">
        <div v-for="index in answerList" :key="index" class="bg-slate-700 rounded-lg hover:bg-slate-500 hover:-translate-y-4 duration-300 cursor-pointer transition-all p-12 h-full text-2xl font-bold hover:text-blue-400" @click="userGuess = parseInt(index)">
          {{ noteKeyMap[index] }} {{ currentSong.mode === 1 ? "Major" : "Minor" }}
        </div>
      </div>
      <div class="rounded-lg hover:bg-red-900 hover:-translate-y-4 duration-300 cursor-pointer transition-all p-12 text-center justify-self-center text-2xl font-bold border-2 border-red-700 text-red-700 hover:text-white">
        {{ $t('vivaldiforse.tone_guessing.i_dont_know') }}
      </div>
    </div>
  </div>
  <!-- <div>
      guessing..
      <button v-for="(note, index) in answerList" :key="index" class="bg-blue-500 rounded-lg mx-4" @click="userGuess = note">
        {{ noteKeyMap[note] }}
      </button>
      <br>
      {{ currentSong.key }}
      <br>
      {{ isCorrect }}
    </div> -->
</template>

<style scoped></style>
