<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Settings from './settings.vue'
import { useIntervalTrainingStore } from '~/store/intervaltraining.store'

const { play } = useTone()

const intervalTrainingStore = useIntervalTrainingStore()

const { userAnswer, isCorrect, selectedIntervals, autoSkip, autoSkipTime, firstNote, secondNote } = storeToRefs(intervalTrainingStore)

const timerStart = ref(false)
const copyAutoSkipTime = ref()

function nextDelay() {
  copyAutoSkipTime.value = autoSkipTime.value
  const interval = setInterval(() => {
    if (copyAutoSkipTime.value <= 0) {
      clearInterval(interval)
      timerStart.value = false
      copyAutoSkipTime.value = autoSkipTime.value
      intervalTrainingStore.newQuestion()
    }
    else {
      copyAutoSkipTime.value--
    }
  }, 1000)

  timerStart.value = true
}

// check the user answer
watch(userAnswer, (newVal) => {
  if (newVal)
    intervalTrainingStore.checkAnswer(newVal)
})

// Auto proceed to next interval if isCorrect === true
watch(isCorrect, (newVal) => {
  if (newVal && autoSkip.value)
    nextDelay()
})

const showSettings = ref(false)
provide('showSettings', showSettings) // exerciseAppBar.vue
</script>

<template>
  <div class="flex h-screen flex-col">
    <ExerciseAppBar :title="$t('exercises.interval_training.title')" :description="$t('exercises.interval_training.description')">
      <template #right>
        <button
          type="button"
          class="rounded-lg bg-yellow-400 px-5 py-2.5 text-sm font-medium text-white hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900"
          @click="intervalTrainingStore.newQuestion()"
        >
          {{ firstNote ? $t('exercises.common.new_question') : $t('exercises.common.start') }}
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
    <!-- container start -->
    <div class="container mx-auto flex w-full flex-1 flex-col">
      <div class="flex-1 w-full relative">
        <div class="flex items-center justify-center text-center h-full">
          <Transition name="list">
            <p v-if="isCorrect" class="text-xl text-green-600 animate__animated animate__tada">
              {{ $t('exercises.common.correct_answer') }}
              <br>
              {{ firstNote }} + {{ secondNote }} = {{ userAnswer }}
            </p>
            <p v-else-if="isCorrect === false" class="text-xl text-red-600 animate__animated animate__shakeX">
              {{ $t('exercises.common.incorrect_answer') }}
            </p>
            <p v-else class="animate__animated animate__bounce">
              {{ !firstNote ? $t('exercises.common.press_to_start') : $t('exercises.common.answer_the_question') }}
            </p>
          </Transition>
        </div>

        <Transition name="list" appear>
          <div
            v-if="firstNote"
            class="absolute flex h-24 w-24 bg-gray-800/30 rounded-lg top-0 left-0 m-4 justify-center items-center text-xl backdrop-blur-md backdrop-brightness-150 cursor-pointer hover:bg-gray-800/80 text-center" @click="intervalTrainingStore.play_interval()"
          >
            {{ $t('exercises.common.replay') }}
          </div>
        </Transition>
        <Transition>
          <div
            v-if="timerStart"
            class="absolute flex h-24 w-24 bg-gray-800/30 rounded-lg bottom-0 left-0 m-4 justify-center items-center text-3xl backdrop-blur-md backdrop-brightness-150"
          >
            {{ copyAutoSkipTime <= 0 ? '>>' : copyAutoSkipTime }}
          </div>
        </Transition>
      </div>

      <TransitionGroup v-show="firstNote" tag="ul" name="list" class="flex justify-center space-x-2 py-4">
        <li
          v-for="(value, index) in selectedIntervals" :key="index" type="button" class="intervalBtn cursor-pointer" :class="{
            // eslint-disable-next-line vue/quote-props
            'correct': isCorrect && index === userAnswer,
            // eslint-disable-next-line vue/quote-props
            'incorrect': isCorrect && index !== userAnswer,
          }" :disabled="isCorrect && index !== userAnswer" @click="userAnswer = index"
        >
          {{ $t(value.name) }}
        </li>
      </TransitionGroup>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.intervalBtn {
  @apply rounded-lg border border-gray-200 bg-white hover:bg-gray-100 py-2.5 px-5 text-sm font-medium text-gray-900 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700;

  &.correct {
    @apply text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800;
  }

  &.incorrect {
    @apply text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-2rem);
}

.list-leave-active {
  position: absolute;
}
</style>
