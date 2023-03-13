<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTonalityGuessingStore } from '~/store/tonalityguessing.store'

const tonalityGuessingStore = useTonalityGuessingStore()

const { isStarted } = storeToRefs(tonalityGuessingStore)
</script>

<template>
  <div class="py-16">
    <div class="container m-auto space-y-8 px-6 md:px-12 lg:px-20">
      <div class="w-1/2">
        <h2 class="mt-4 text-2xl font-bold text-gray-800 dark:text-white md:text-4xl">
          {{ $t('vivaldiforse.tone_guessing.title') }}
        </h2>
        <p class="font-normal ml-1 mt-1">
          {{ $t('vivaldiforse.tone_guessing.description') }}
        </p>
      </div>
      <div class="mt-16 grid gap-8 sm:grid-cols-2 md:-mx-8 lg:grid-cols-2">
        <div class="p-8 py-12 sm:p-12 rounded-3xl bg-white border border-gray-100 dark:shadow-none dark:border-gray-700 dark:bg-gray-800 bg-opacity-50 shadow-2xl shadow-gray-600/10">
          <div class="space-y-16">
            <div
              aria-hidden="true"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-pink-50 dark:bg-gray-700"
            >
              <span class="font-bold text-blue-600 dark:text-blue-500">1</span>
            </div>
            <div class="space-y-4">
              <h3 class="text-2xl font-semibold text-gray-800 transition dark:text-white">
                {{ $t('vivaldiforse.tone_guessing.focus_and_listen') }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300">
                {{ $t('vivaldiforse.tone_guessing.focus_and_listen_description') }}
              </p>
            </div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1945/1945984.png"
              class="w-16"
              width="512"
              height="512"
              alt="burger illustration"
            >
          </div>
        </div>
        <div class="p-8 py-12 sm:p-12 rounded-3xl bg-white border border-gray-100 dark:shadow-none dark:border-gray-700 dark:bg-gray-800 bg-opacity-50 shadow-2xl shadow-gray-600/10">
          <div class="space-y-16">
            <div
              aria-hidden="true"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-pink-50 dark:bg-gray-700"
            >
              <span class="font-bold text-blue-600 dark:text-blue-500">2</span>
            </div>
            <div class="space-y-4">
              <h3 class="text-2xl font-semibold text-gray-800 transition dark:text-white">
                {{ $t('vivaldiforse.tone_guessing.choose_your_answer') }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300">
                {{ $t('vivaldiforse.tone_guessing.choose_your_answer_description') }}
              </p>
            </div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2753/2753332.png"
              class="w-16"
              width="512"
              height="512"
              alt="burger illustration"
            >
          </div>
        </div>
      </div>
      <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="isStarted = true">
        {{ $t('exercises.common.start') }}
        <svg aria-hidden="true" class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.lottie-animation-container {
    width: var(--lottie-animation-container-width);
    height: var(--lottie-animation-container-height);
    background-color: var(--lottie-animation-container-background-color);
    overflow: hidden;
    margin: 0;
}
</style>
