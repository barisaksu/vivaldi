<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="w-full bg-white dark:bg-gray-900">
    <div class="mx-auto max-w-screen-xl py-4 px-4 lg:py-12 lg:px-12">
      <h1
        class="animate__animated animate__jackInTheBox w-min mb-4 bg-gradient-to-br from-blue-400 to-blue-600 bg-clip-text text-4xl font-extrabold leading-none tracking-tight text-transparent md:text-5xl lg:text-6xl font-sans"
      >
        Vivaldi
      </h1>
      <p
        class="mb-8 text-lg font-normal text-gray-500 dark:text-gray-400 lg:text-xl pl-2"
      >
        {{ t('site.shortDescription') }}
      </p>

      <div class="flex gap-2 lg:gap-8  pb-12">
        <ExerciseCard to="/exercises/pitch-training" :title="$t('exercises.pitch_training.title')">
          {{ $t('exercises.pitch_training.description') }}
        </ExerciseCard>
        <ExerciseCard to="/exercises/interval-training" :title="$t('exercises.interval_training.title')">
          {{ $t('exercises.interval_training.description') }}
        </ExerciseCard>
      </div>
      <SponsorIncentive />
      <Sponsors />
    </div>
  </div>
</template>
