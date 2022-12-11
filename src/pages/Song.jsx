import React from 'react'
import { Link, useParams } from 'react-router-dom'
import ALL_SONGS from '../data/playlist'
import usePlayerStore from '../store/store'

export default function SongPage() {
  const { songId } = useParams()
  const song = ALL_SONGS.find((song) => parseInt(song.id) === parseInt(songId))
  const { title = 'not found', src = '' } = song || {}

  const isPlaying = usePlayerStore((state) => state.isPlaying)
  const playingSrc = usePlayerStore((state) => state.src)
  const setSrc = usePlayerStore((state) => state.setSrc)
  const setPlaying = usePlayerStore((state) => state.setPlaying)
  const setPaused = usePlayerStore((state) => state.setPaused)

  const handleOnPlay = () => {
    if (src === playingSrc) {
      isPlaying ? setPaused() : setPlaying()
    } else {
      setSrc(src)
    }
  }

  return (
    <div className="container">
      <div className="inner">
        <Link to="/">Back to homepage</Link>
        <h1>Title: {title}</h1>
        <p>Song ID: {songId}</p>
        {src && (
          <button type="button" onClick={handleOnPlay}>
            {playingSrc === src && isPlaying ? 'Pause' : 'Play'}
          </button>
        )}
      </div>
    </div>
  )
}
