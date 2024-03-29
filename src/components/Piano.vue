<script setup lang="ts">
import { WebMidi } from 'webmidi'
import { storeToRefs } from 'pinia'
import { usePianoStore } from '~/store/piano.store'
import { useMidiStore } from '~/store/midi.store'

const props = withDefaults(defineProps<Props>(), {
  scale: () => ['C2', 'C#2', 'D2', 'D#2', 'E2', 'F2', 'F#2', 'G2', 'G#2', 'A2', 'A#2', 'B2', 'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3', 'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5'],
})

const midiStore = useMidiStore()

const { midi_input } = storeToRefs(midiStore)

interface Props {
  scale?: string[]
}

const { play } = useTone()

const pianoStore = usePianoStore()

function playNote(note: string, event?: any) {
  event?.target.classList.add('pressed')
  pianoStore.pressed = note
  play(note, '8n')
}

function removePressed(event: any) {
  event.target.classList.remove('pressed')
}

/**
 * MIDI
 */
watch(midi_input, (value) => {
  console.log('input was changed: ', value)

  const input = WebMidi.getInputByName(value.toString())
  input.addListener('noteon', (e) => { // note on
    console.log('Note on: ', e.note.identifier)
    playNote(e.note.identifier)
  })

  input.addListener('noteoff', (e) => { // note off
    console.log('Note off çalıştı: ', e.note.identifier)
  })
})
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full overflow-y-auto scale-90">
    <div
      class="flex h-auto w-full lg:w-fit items-center justify-center overflow-y-auto rounded-lg border border-gray-700 bg-gray-800 p-1"
    >
      <div class="flex">
        <div
          v-for="(key, index) in props.scale"
          :key="index"
          class=""
          :class="[key.includes('#') ? 'black' : 'white', key === pianoStore.pressed ? 'pressed' : '']"
          @mousedown="playNote(key, $event)"
          @mouseup="removePressed"
        >
          <span class="scale-75">{{ key }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:root {
  --keyboard: hsl(215deg 28% 17%);
  --keyboard-shadow: hsla(19, 50%, 66%, 0.2);
  --keyboard-border: hsl(20, 91%, 5%);
  --black-10: hsla(0, 0%, 0%, 0.1);
  --black-20: hsla(0, 0%, 0%, 0.2);
  --black-30: hsla(0, 0%, 0%, 0.3);
  --black-50: hsla(0, 0%, 0%, 0.5);
  --black-60: hsla(0, 0%, 0%, 0.6);
  --white-20: hsla(0, 0%, 100%, 0.2);
  --white-50: hsla(0, 0%, 100%, 0.5);
  --white-80: hsla(0, 0%, 100%, 0.8);
}

.white,
.black {
  position: relative;
  float: left;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 0.5rem 0;
  user-select: none;
  cursor: pointer;
}

#keyboard li:first-child {
  border-radius: 5px 0 5px 5px;
}

#keyboard li:last-child {
  border-radius: 0 5px 5px 5px;
}

.white {
  height: 12.5rem;
  width: 2.5rem;
  z-index: 1;
  border-left: 1px solid hsl(0, 0%, 73%);
  border-bottom: 1px solid hsl(0, 0%, 73%);
  border-radius: 0 0 5px 5px;
  box-shadow: -1px 0 0 var(--white-80) inset, 0 0 5px hsl(0, 0%, 80%) inset,
    0 0 3px var(--black-20);
  background: linear-gradient(to bottom, hsl(0, 0%, 93%) 0%, white 100%);
  color: #898989;
}

.black {
  height: 8rem;
  width: 2rem;
  margin: 0 0 0 -1rem;
  z-index: 2;
  border: 1px solid black;
  border-radius: 0 0 3px 3px;
  box-shadow: -1px -1px 2px var(--white-20) inset,
    0 -5px 2px 3px var(--black-60) inset, 0 2px 4px var(--black-50);
  background: linear-gradient(45deg, hsl(0, 0%, 13%) 0%, hsl(0, 0%, 33%) 100%);
  color: var(--white-50);
  margin-right: -16px;
}

.white.pressed {
  border-top: 1px solid hsl(0, 0%, 47%);
  border-left: 1px solid hsl(0, 0%, 60%);
  border-bottom: 1px solid hsl(0, 0%, 60%);
  box-shadow: 2px 0 3px var(--black-10) inset,
    -5px 5px 20px var(--black-20) inset, 0 0 3px var(--black-20);
  background: linear-gradient(to bottom, white 0%, hsl(0, 0%, 91%) 100%);
  outline: none;
}

.black.pressed {
  box-shadow: -1px -1px 2px var(--white-20) inset,
    0 -2px 2px 3px var(--black-60) inset, 0 1px 2px var(--black-50);
  background: linear-gradient(
    to right,
    hsl(0, 0%, 27%) 0%,
    hsl(0, 0%, 13%) 100%
  );
  outline: none;
}

.offset {
  margin: 0 0 0 -1rem;
}
</style>

