import { acceptHMRUpdate, defineStore } from 'pinia'

export const useTonalityGuessingStore = defineStore('tonalityguessing', () => {
  const isStarted = ref(false)
  const isLoading = ref(true)
  const currentSong = ref({
    name: '',
    artist: '',
    preview_url: '',
    image_url: '',
    track_id: '',
    key: '',
    mode: '',
  })
  const showGuessing = ref(false)
  const userGuess = ref<any>()

  // if currentSong.key is equal to userGuess, then the user is correct
  const isCorrect = computed(() => {
    if (userGuess.value === undefined || userGuess.value === null)
      return null
    return Number(currentSong.value.key) === Number(userGuess.value)
  })

  function resetGame() {
    currentSong.value = {
      name: '',
      artist: '',
      preview_url: '',
      image_url: '',
      track_id: '',
      key: '',
      mode: '',
    }
    showGuessing.value = false
    userGuess.value = null
  }

  return {
    isStarted,
    isLoading,
    currentSong,
    showGuessing,
    userGuess,
    isCorrect,
    resetGame,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTonalityGuessingStore, import.meta.hot))
