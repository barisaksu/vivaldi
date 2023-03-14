import { createClient } from '@supabase/supabase-js'
const { Client } = require('spotify-api.js')

require('dotenv').config()

// Connect to  database
const supabase = createClient(process.env.DATABASE_URL, process.env.SUPABASE_SERVICE_API_KEY)

/* -------------------------------------------------------------------------- */
/*                                random search                               */
/* -------------------------------------------------------------------------- */
function getRandomSearch() {
  // A list of all characters that can be chosen.
  const characters = 'abcdefghijklmnopqrstuvwxyz'

  // Gets a random character from the characters string.
  const randomCharacter = characters.charAt(Math.floor(Math.random() * characters.length))
  let randomSearch = ''

  // Places the wildcard character at the beginning, or both beginning and end, randomly.
  switch (Math.round(Math.random())) {
    case 0:
      randomSearch = `${randomCharacter}%`
      break
    case 1:
      randomSearch = `%${randomCharacter}%`
      break
  }

  return randomSearch
}

export async function handler() {
  console.log('Getting a random track from Spotify...')

  // Get a random search term
  const randomSearch = getRandomSearch()

  // Create a new client
  const client = await Client.create({
    refreshToken: true,
    token: {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    },
    retryOnRateLimit: true,
    cacheSettings: true,

    onRefresh() {
      console.log(`Token has been refreshed. New token: ${client.token}!`)
    },
  })

  const results = await client.tracks.search(randomSearch)

  // get a random track from the results
  const randomTrack = results[Math.floor(Math.random() * results.length)]

  // get the track id
  const trackId = randomTrack.id

  // get the track details
  const track = await client.tracks.get(trackId)

  // if track is not playable, get another track
  if (!track.previewURL)
    return handler()

  // get the track analysis
  const trackAnalysis = await client.tracks.getAudioAnalysis(trackId)

  // add the track to the database
  const trackDetails = {
    track_id: track.id,
    name: track.name,
    artist: track.artists[0].name,
    preview_url: track.previewURL,
    image_url: track.album.images[0].url,
    key: trackAnalysis.track.key,
    key_confidence: trackAnalysis.track.key_confidence,
    mode: trackAnalysis.track.mode, // 1 = major, 0 = minor
    tempo: trackAnalysis.track.tempo,
    tempo_confidence: trackAnalysis.track.tempo_confidence,
    time_signature: trackAnalysis.track.timeSignature,
  }

  // Insert a row into the table
  const { data, error } = await supabase
    .from('spotify_tracks')
    .insert([
      { ...trackDetails },
    ])

  // Did it work?
  console.log(data, error)

  return {
    statusCode: 200,
    body: JSON.stringify(trackDetails),
  }
}
