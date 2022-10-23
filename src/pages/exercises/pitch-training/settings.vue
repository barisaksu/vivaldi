<script setup lang="ts">
import { storeToRefs } from 'pinia'
const { t } = useI18n()

const pitchTrainingStore = usePitchTrainingStore()

const { autoSkip, strictMode }
    = storeToRefs(pitchTrainingStore)
</script>

<template>
  <div class="flex flex-col space-y-4 p-4">
    <Checkbox
      v-model:checked="autoSkip"
      :label="t('exercises.pitch_training.automatic_new_question')"
      :description="t('exercises.pitch_training.automatic_new_question_desc')"
    />
    <Checkbox
      v-model:checked="strictMode"
      :label="t('exercises.pitch_training.strict_mode')"
      :description="t('exercises.pitch_training.strict_mode_desc')"
    />
  </div>
</template>

<style scoped>

</style>

