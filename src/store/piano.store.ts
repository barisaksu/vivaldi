import { acceptHMRUpdate, defineStore } from 'pinia'

export const usePianoStore = defineStore('piano', () => {
  /**
   * Current pressed keys
   */
  const pressed: any = ref('')

  const pressedNote = computed(() => pressed.value)
  /**
   * clears the pressed key information.
   *
   */
  function pressedToNull() {
    pressed.value = null
  }

  return {
    pressed,
    pressedNote,
    pressedToNull,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePianoStore, import.meta.hot))
