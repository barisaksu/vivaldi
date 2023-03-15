<script setup lang="ts">
const bpm = ref(120)

/* -------------------------- Computed Properties -------------------------- */

const reverbProperties = computed(() => {
  const quarterNote = (60 / bpm.value) * 4000
  const dotted = quarterNote * 1.5
  const triplet = quarterNote / 1.5
  return { quarterNote, dotted, triplet }
})

/* ------------------------ Note Values Computation ------------------------- */

const noteValues = computed(() => {
  const { quarterNote, dotted, triplet } = reverbProperties.value
  return Array.from({ length: 10 }, (_, i) => {
    const noteValue = `1/${2 ** i}`
    return {
      noteValue,
      quarterNote: quarterNote / parseInt(noteValue.split('/')[1]),
      dotted: dotted / parseInt(noteValue.split('/')[1]),
      triplet: triplet / parseInt(noteValue.split('/')[1]),
    }
  })
})

/* ------------------------ Reverb Sizes Computation ------------------------ */

const reverbSizeNames = ['Hall (2 bars)', 'Large Room (1 bar)', 'Small Room (1/2)', 'Tight Ambience (1/4 Note)']
const reverbSizes = computed(() => {
  const { quarterNote } = reverbProperties.value
  return reverbSizeNames.map((name, i) => {
    const size = 32 * 2 ** i
    return {
      name,
      preDelay: quarterNote / size,
      decayTime: (quarterNote * 64 / size) - (quarterNote / size),
      totalTime: (quarterNote * 64 / size),
    }
  })
})

/* ------------------------ Set BPM Presets ------------------------ */
function setBPM(bpmValue: number) {
  bpm.value = bpmValue
}

const { t } = useI18n()

useHead({
  title: `${t('musician_tools.reverb_delay_time_calculator')} - ${t('sidebar.musician_tools')}`,
})
</script>

<template>
  <div class="container-fluid mx-auto">
    <div class="container mx-auto">
      <div class="flex items-center justify-between mt-4 mb-3">
        <!-- left side -->
        <div class="left">
          BPM: {{ bpm }}
        </div>
        <!-- right side -->
        <div class="right">
          <div class="inline-flex rounded-md shadow-sm" role="group">
            <button type="button" class="presetButtons rounded-l-lg border-2" @click="setBPM(60)">
              60
            </button>
            <button type="button" class="presetButtons border-y-2 border-r-2" @click="setBPM(90)">
              90
            </button>
            <button type="button" class="presetButtons border-y-2 border-r-2" @click="setBPM(110)">
              110
            </button>
            <button type="button" class="presetButtons border-y-2 border-r-2" @click="setBPM(120)">
              120
            </button>
            <button type="button" class="presetButtons border-y-2" @click="setBPM(128)">
              128
            </button>
            <button type="button" class="presetButtons rounded-r-lg border-2" @click="setBPM(140)">
              140
            </button>
          </div>
        </div>
      </div>
      <input
        id="large-range" v-model="bpm" type="range" min="0" max="240"
        class="w-full h-3 mb-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg dark:bg-gray-700"
      >
      <div class="relative overflow-x-auto rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                NOTE VALUE (Time)
              </th>
              <th scope="col" class="px-6 py-3">
                NOTES
              </th>
              <th scope="col" class="px-6 py-3">
                DOTTED
              </th>
              <th scope="col" class="px-6 py-3">
                TRIPLETS
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(noteValue, index) in noteValues" :key="index"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {{ noteValue.noteValue }}
              </th>
              <td class="px-6 py-4">
                {{ noteValue.quarterNote.toFixed(2) }} ms /
                <span class="text-xs text-green-500">{{ (1000 / noteValue.quarterNote).toFixed(2) }} Hz</span>
              </td>
              <td class="px-6 py-4">
                {{ noteValue.dotted.toFixed(2) }} ms /
                <span class="text-xs text-green-500">{{ (1000 / noteValue.dotted).toFixed(2) }} Hz</span>
              </td>
              <td class="px-6 py-4">
                {{ noteValue.triplet.toFixed(2) }} ms /
                <span class="text-xs text-green-500">{{ (1000 / noteValue.triplet).toFixed(2) }} Hz</span>
              </td>
            </tr>
          </tbody>
        </table>
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                SIZE
              </th>
              <th scope="col" class="px-6 py-3">
                PRE-DELAY
              </th>
              <th scope="col" class="px-6 py-3">
                DECAY TIME
              </th>
              <th scope="col" class="px-6 py-3">
                TOTAL REVERB TIME
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(reverbValue, index) in reverbSizes" :key="index"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {{ reverbValue.name }}
              </th>
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {{ reverbValue.preDelay.toFixed(2) }} ms
              </th>
              <td class="px-6 py-4">
                {{ reverbValue.decayTime.toFixed(2) }} ms /
                <span class="text-xs text-green-500">{{ (1000 / reverbValue.decayTime).toFixed(2) }} Hz</span>
              </td>
              <td class="px-6 py-4">
                {{ reverbValue.totalTime.toFixed(2) }} ms /
                <span class="text-xs text-green-500">{{ (1000 / reverbValue.totalTime).toFixed(2) }} Hz</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.presetButtons {
  @apply px-4 py-2 text-sm font-medium dark:bg-blue-700 text-gray-900 bg-transparent border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10  focus:bg-gray-900 focus:text-white dark:border-blue-800 dark:text-white dark:hover:text-white dark:hover:bg-blue-800 dark:focus:bg-blue-800 dark:focus:border-blue-800;
}
</style>
