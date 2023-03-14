<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMidiStore } from '~/store/midi.store'
const { t, locale } = useI18n()

const midiStore = useMidiStore()

const { inputs, midi_input } = storeToRefs(midiStore)

// const mode = reactive(isDark)

const globalSettings = useStorage('globalSettings', {
  lang: 'en',
  midiInput: 'none',
})

const availableLangs = ref([
  { label: 'English', value: 'en' },
  { label: 'Türkçe', value: 'tr' },
])

watch(locale, (value) => {
  globalSettings.value.lang = value
})

watch(midi_input, (value) => {
  globalSettings.value.midiInput = value
})
</script>

<template>
  <div class="grid grid-cols-1 p-4 space-y-8">
    <Select id="locales" v-model:selected="locale" :label="t('button.toggle_langs')">
      <option v-for="lang in availableLangs" :key="lang.value" :value="lang.value" :selected="lang.value === locale">
        {{ lang.label }}
      </option>
    </Select>

    <Select id="inputs" v-model:selected="midi_input" label="MIDI Input">
      <option v-for="(input, index) in inputs" :key="index" :value="input" :selected="input === midi_input">
        {{ input }}
      </option>
    </Select>

    <!-- <Checkbox v-model:checked="mode" :label="t('button.toggle_dark')" /> -->
  </div>
</template>

<style scoped>

</style>
