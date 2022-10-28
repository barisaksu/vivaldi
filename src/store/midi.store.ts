import { acceptHMRUpdate, defineStore } from 'pinia'
import { WebMidi } from 'webmidi'

export const useMidiStore = defineStore('midistore', () => {
  const inputs: any = ref(['Select midi input device']) // all available inputs
  const midi_input: any = ref(null) // selected input
  // const midi_output = ref(null) // selected output

  onMounted(() => {
    WebMidi
      .enable()
      .then(onEnabled)
      .catch(err => console.error(err))

    function onEnabled() {
      // Inputs
      WebMidi.inputs.forEach((input) => {
        inputs.value.push(input.name)
      })

      // Outputs
      WebMidi.outputs.forEach(output => console.log(output.manufacturer, output.name))
    }
  })

  return {
    inputs,
    midi_input,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMidiStore, import.meta.hot))
