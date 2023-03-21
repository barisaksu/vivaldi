import * as Tone from 'tone'

export function useTone() {
  const isLoaded = ref<boolean>(false)
  const sampler = new Tone.Sampler(
    {
      'C3': 'C3v8.mp3',
      'C4': 'C4v8.mp3',
      'C5': 'C5v8.mp3',
      'C6': 'C6v8.mp3',
      'F#3': 'Fs3v8.mp3',
      'F#4': 'Fs4v8.mp3',
      'F#5': 'Fs5v8.mp3',
      'F#6': 'Fs6v8.mp3',
      'A3': 'A3v8.mp3',
      'A4': 'A4v8.mp3',
      'A5': 'A5v8.mp3',
      'A6': 'A6v8.mp3',
    },
    {
      release: 1,
      baseUrl: '/samples/',
      onload: () => {
        isLoaded.value = true
        console.info('Tone.ts loaded')
      },
    },
  ).toDestination()

  const play = (note: string, time: string) => {
    sampler.triggerAttackRelease(note, time)
  }

  const playInterval = {
    ascending(notes: [string, string], time: string) {
      sampler.triggerAttackRelease(notes[0], time, Tone.now())
      sampler.triggerAttackRelease(notes[1], time, Tone.now() + 1)
    },
    descending(notes: [string, string], time: string) {
      sampler.triggerAttackRelease(notes[1], time, Tone.now())
      sampler.triggerAttackRelease(notes[0], time, Tone.now() + 1)
    },
    harmonic(notes: string | [string, string], time: string, now = 0) {
      if (typeof notes === 'string') {
        sampler.triggerAttackRelease(notes, time, Tone.now() + now)
      }
      else {
        sampler.triggerAttackRelease(notes[0], time, Tone.now() + now)
        sampler.triggerAttackRelease(notes[1], time, Tone.now() + now)
      }
    },
    ascending_harmonic(notes: [string, string], time: string) {
      playInterval.ascending(notes, time)
      playInterval.harmonic(notes, time, 2)
    },
    descending_harmonic(notes: [string, string], time: string) {
      playInterval.descending(notes, time)
      playInterval.harmonic(notes, time, 2)
    },
  }

  return { play, playInterval, isLoaded }
}
