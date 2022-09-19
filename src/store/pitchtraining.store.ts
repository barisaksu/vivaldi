import { acceptHMRUpdate, defineStore } from 'pinia'
import { Range } from '@tonaljs/tonal'
import { usePianoStore } from './piano.store'

const pianoStore = usePianoStore()

export const usePitchTrainingStore = defineStore('pitchtraining', () => {
  const scale = ref(Range.chromatic(['C2', 'C5'], { sharps: true }))
  const question: any = ref(null)
  const answer: any = ref(null)

  // Settings
  const autoSkip = ref(true)
  const strictMode = ref(false)

  function newQuestion() {
    pianoStore.pressedToNull()
    answer.value = null
    question.value
      = scale.value[Math.floor(Math.random() * scale.value.length)]
  }

  function checkAnswer(pressedNote: any) {
    if (question.value !== null) {
      return (answer.value = strictMode.value
        ? strictModeAnswerCheck(pressedNote)
        : freeModeAnswerCheck(pressedNote))
    }
  }

  function freeModeAnswerCheck(note: string | any[]) {
    console.log('freeModeAnswerCheck çalıştı', note)
    if (question.value?.length > 2)
      return note?.includes(question.value?.substring(2, -1))

    else if (note?.length === 2)
      return note?.includes(question.value?.substring(0, 1))

    else
      return false
  }

  function strictModeAnswerCheck(note: string | any[]) {
    console.log('strictModeAnswerCheck çalıştı', note)
    if (question.value?.length > 2)
      return note?.includes(question.value)

    else if (note?.length === 2)
      return note?.includes(question.value)

    else
      return false
  }

  return {
    scale,
    question,
    answer,
    autoSkip,
    strictMode,
    checkAnswer,
    newQuestion,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePianoStore, import.meta.hot))
