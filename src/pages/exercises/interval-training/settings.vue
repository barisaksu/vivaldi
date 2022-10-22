<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useIntervalTrainingStore } from '~/store/intervaltraining.store'
const { t } = useI18n()

const intervalTrainingStore = useIntervalTrainingStore()

const { intervals, intervalType, autoSkip, autoSkipTime }
  = storeToRefs(intervalTrainingStore)
</script>

<template>
  <div class="flex flex-col space-y-4">
    <div class="p-4">
      <Checkbox
        v-model:checked="autoSkip"
        :label="t('exercises.pitch_training.automatic_new_question')"
        :description="t('exercises.pitch_training.automatic_new_question_desc')"
      />

      <Transition mode="in-out">
        <div v-if="autoSkip" class="pl-6 pt-2">
          <label for="small-range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ autoSkipTime > 0 ? `after ${autoSkipTime} seconds` : 'Instantly' }}</label>
          <input id="small-range" v-model="autoSkipTime" type="range" min="0" max="10" class="mb-6 w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700">
        </div>
      </transition>
    </div>
    <h2 class="border-b border-gray-700 font-semibold bg-gray-900 p-2">
      Interval Range
    </h2>
    <div class="px-4 pb-2 space-y-4">
      <Checkbox
        v-for="(interval, index) in intervals" :key="index" v-model:checked="interval.selected"
        :label="`${t(interval.name)} (${index})`"
      />
    </div>

    <h2 class="border-b border-gray-700 font-semibold bg-gray-900 p-2">
      Play Mode
    </h2>

    <div class="px-4 pb-2">
      <Radio v-model:selected="intervalType" name="intervalType" :label="t('exercises.interval_training.ascending')" value="ascending" checked />
      <Radio v-model:selected="intervalType" name="intervalType" :label="t('exercises.interval_training.descending')" value="descending" checked />
      <Radio v-model:selected="intervalType" name="intervalType" :label="t('exercises.interval_training.ascending_harmonic')" value="ascending_harmonic" checked />
      <Radio v-model:selected="intervalType" name="intervalType" :label="t('exercises.interval_training.descending_harmonic')" value="descending_harmonic" checked />
      <Radio v-model:selected="intervalType" name="intervalType" :label="t('exercises.interval_training.harmonic')" value="harmonic" checked />
    </div>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
