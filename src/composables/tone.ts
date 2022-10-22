import * as Tone from 'tone'

export function useTone() {
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
      baseUrl: window.location.hostname.includes('127.0.0.1')
        ? '/samples/'
        : 'https://updownupdown.github.io/chords/samples/',
      onload: () => {
        console.log('Tone.ts loaded')
      },
    },
  ).toDestination()

  const isLoaded = ref(sampler.loaded)

  // plays a single note
  function play(note: string | string[], time: string) {
    sampler.triggerAttackRelease(note, time)
  }

  // play a chord
  const playInterval = {
    ascending(notes: string[], time: string) {
      sampler.triggerAttackRelease(notes[0], time, Tone.now())
      sampler.triggerAttackRelease(notes[1], time, Tone.now() + 1)
    },
    descending(notes: string[], time: string) {
      sampler.triggerAttackRelease(notes[1], time, Tone.now())
      sampler.triggerAttackRelease(notes[0], time, Tone.now() + 1)
    },
    harmonic(notes: string[], time: string, now = 0) {
      sampler.triggerAttackRelease(notes, time, Tone.now() + now)
    },
    ascending_harmonic(notes: string[], time: string) {
      this.ascending(notes, time)
      this.harmonic(notes, time, 2)
    },
    descending_harmonic(notes: string[], time: string) {
      this.descending(notes, time)
      this.harmonic(notes, time, 2)
    },
  }

  return { play, playInterval, isLoaded }
}
