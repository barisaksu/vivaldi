const audioCtx = new AudioContext()
let analyser = audioCtx.createAnalyser()
analyser.fftSize = 2048

const AudioContext = {
  getAudioContext(): any {
    return audioCtx
  },

  getAnalyser(): any {
    return analyser
  },

  resetAnalyser() {
    analyser = audioCtx.createAnalyser()
  },

  decodeAudioData(audioData: any) {
    audioCtx.decodeAudioData(audioData).then((decodedData) => {
      // use the decoded data here
    })
  },
}

export default AudioContext
