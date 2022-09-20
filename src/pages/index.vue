<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="w-full bg-white dark:bg-gray-900">
    <div class="mx-auto max-w-screen-xl py-4 px-4 lg:py-12 lg:px-12">
      <Transition
        enter-active-class="animate-pulse"
        leave-active-class="animate-bounce"
        appear
      >
        <h1
          class="mb-4 bg-gradient-to-br from-blue-400 to-blue-600 bg-clip-text text-4xl font-extrabold leading-none tracking-tight text-transparent md:text-5xl lg:text-6xl"
        >
          Vivaldi
        </h1>
      </Transition>
      <p
        class="mb-8 text-lg font-normal text-gray-500 dark:text-gray-400 lg:text-xl"
      >
        {{ t('site.shortDescription') }}
      </p>

      <div class="columns-1 md:columns-2 gap-8 space-y-4 pb-12 text-start">
        <ExerciseCard to="/exercises/pitch-training" title="Pitch Training">
          Recognize sounds and heal your musical ear.
        </ExerciseCard>
        <ExerciseCard title="Interval Training" />
        <ExerciseCard title="Ryhtm Training" />
        <ExerciseCard title="Related Minors" />
      </div>
      <SponsorIncentive />
    </div>
  </div>
</template>
