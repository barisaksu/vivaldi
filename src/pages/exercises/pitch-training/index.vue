<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Settings from './settings.vue'
import { usePianoStore } from '~/store/piano.store'
const { play } = useTone()

const pianoStore = usePianoStore()

const pitchTrainingStore = usePitchTrainingStore()

const { pressed } = storeToRefs(pianoStore)

const { scale, question, answer }
    = storeToRefs(pitchTrainingStore)

const showSettings = ref(false)

provide(
  'questionProvide',
  computed(() => question.value),
)

provide('showSettings', showSettings)

watch(question, (note) => {
  play(note, '2n')
})

watch(answer, (val) => {
  if (val && pitchTrainingStore.autoSkip) {
    setTimeout(() => {
      pitchTrainingStore.newQuestion()
    }, 1000)
  }
})

const { t } = useI18n()
useHead({
  title: `${t('exercises.pitch_training.title')} - ${t('sidebar.exercises')}`,
})
</script>

<template>
  <div class="flex h-screen flex-col">
    <ExerciseAppBar
      :title="$t('exercises.pitch_training.title')"
      :description="$t('exercises.pitch_training.description')"
    >
      <template #right>
        <button
          type="button"
          class="rounded-lg bg-yellow-400 px-5 py-2.5 text-sm font-medium text-white hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900"
          @click="pitchTrainingStore.newQuestion"
        >
          {{ question ? $t('exercises.common.new_question') : $t('exercises.common.start') }}
        </button>

        <button
          type="button"
          class="rounded-lg bg-green-400 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900"
          @click="play('A4', '2n')"
        >
          {{ $t('exercises.common.play_la') }}
        </button>

        <button
          type="button"
          class="rounded-lg border border-gray-200 bg-white py-2.5 px-5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
          @click="showSettings = !showSettings"
        >
          {{ $t('exercises.common.settings') }}
        </button>
      </template>
      <template #settings>
        <Settings />
      </template>
    </ExerciseAppBar>
    <div
      class="container mx-auto flex w-full flex-1 flex-col items-center justify-center"
    >
      <p v-if="!question">
        {{ $t('exercises.common.press_to_start') }}
      </p>
      <button
        v-else
        type="button"
        class="rounded-lg border border-gray-200 bg-white py-2.5 px-5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
        @click="play(question, '2n')"
      >
        {{ $t('exercises.common.replay') }}
      </button>

      <div
        v-if="pianoStore.pressed !== null && question"
        class="m-2 rounded-lg p-2"
      >
        <span
          v-if="pitchTrainingStore.checkAnswer(pressed)"
          class="text-green-500"
        >
          {{ $t('exercises.common.correct_answer') }}
        </span>
        <span v-else class="text-red-500"> {{ $t('exercises.common.incorrect_answer') }}</span>
      </div>
      <!-- <p v-if="!synthLoaded">Loaded.....</p> -->
    </div>
    <Piano :scale="scale" class="mb-4 flex flex-shrink-0" />
  </div>
</template>

  <style lang="scss" scoped></style>

