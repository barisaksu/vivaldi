// ? https://kingsora.github.io/OverlayScrollbars/#!demos/basic
// Bunu kullanmayı düşün....

// sistem teması light olduğu zaman bile dark mod ilk girişte aktif olsun!!!

import { acceptHMRUpdate, defineStore } from 'pinia'
import { Interval, Note, Range } from '@tonaljs/tonal'

// const { playInterval } = useTone()

export const useIntervalTrainingStore = defineStore('intervaltraining', () => {
  const scale = ref(Range.chromatic(['C2', 'C5'], { sharps: true }))
  const intervals: any = ref({
    '1P': { name: 'exercises.interval_training.1P', selected: false },
    '2m': { name: 'exercises.interval_training.2m', selected: true },
    '2M': { name: 'exercises.interval_training.2M', selected: false },
    '3m': { name: 'exercises.interval_training.3m', selected: false },
    '3M': { name: 'exercises.interval_training.3M', selected: true },
    '4P': { name: 'exercises.interval_training.4P', selected: false },
    '5P': { name: 'exercises.interval_training.5P', selected: true },
    '6m': { name: 'exercises.interval_training.6m', selected: false },
    '6M': { name: 'exercises.interval_training.6M', selected: false },
    '7m': { name: 'exercises.interval_training.7m', selected: false },
    '7M': { name: 'exercises.interval_training.7M', selected: false },
  })
  const selectedIntervals: any = computed(() => Object.fromEntries(Object.entries(intervals.value).filter(([_key, value]: any) => {
    return value.selected
  })))
  const intervalType = ref('harmonic')
  const firstNote = ref()
  const secondNote = ref()
  const result = ref(Interval.distance(firstNote.value, secondNote.value))
  const userAnswer: any = ref('')
  const isCorrect: any = ref(null)
  const questionCount = ref(0)

  // others
  const autoSkip = ref(true)
  const autoSkipTime = ref(3)

  function randomNote() {
    return scale.value[Math.floor(Math.random() * scale.value.length)]
  }

  function newQuestion() {
    questionCount.value += 1
    userAnswer.value = '' // reset user answer
    isCorrect.value = null // reset isCorrect

    firstNote.value = randomNote()
    secondNote.value = Note.transpose(
      firstNote.value,
      Object.keys(selectedIntervals.value)[
        Math.floor(Math.random() * Object.keys(selectedIntervals.value).length)
      ],
    )
    result.value = Interval.distance(firstNote.value, secondNote.value)
  }

  // function play_interval() {
  //   switch (intervalType.value) {
  //     case 'ascending': playInterval.ascending([firstNote.value, secondNote.value], '2n'); break
  //     case 'descending': playInterval.descending([firstNote.value, secondNote.value], '2n'); break
  //     case 'harmonic': playInterval.harmonic([firstNote.value, secondNote.value], '2n'); break
  //     case 'ascending_harmonic': playInterval.ascending_harmonic([firstNote.value, secondNote.value], '2n'); break
  //     case 'descending_harmonic': playInterval.descending_harmonic([firstNote.value, secondNote.value], '2n'); break
  //   }
  // }

  function checkAnswer(answer: string) {
    isCorrect.value = answer === result.value
    if (isCorrect.value === false) {
      setTimeout(() => {
        // reset user answer && isCorrect
        isCorrect.value = null
        userAnswer.value = ''
      }, 1000)
    }
    return answer === result.value
  }

  // !! Return edilen değerlerin bir çoğu kullanılmıyor, bunlara bak!!
  return {
    scale,
    selectedIntervals,
    intervals,
    intervalType,
    randomNote,
    firstNote,
    secondNote,
    newQuestion,
    result,
    checkAnswer,
    isCorrect,
    userAnswer,
    autoSkip,
    autoSkipTime,
    questionCount,

  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useIntervalTrainingStore, import.meta.hot))
