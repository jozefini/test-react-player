import React from 'react'
import { Link } from 'react-router-dom'
import AudioPlayer from '../components/AudioPlayer'
import ChangeLayout from '../components/ChangeLayout'
import ALL_SONGS from '../data/playlist'
import usePlayerStore from '../store/store'

export default function HomePage() {
  const playingSrc = usePlayerStore((state) => state.src)
  const isPlaying = usePlayerStore((state) => state.isPlaying)
  const setPlaying = usePlayerStore((state) => state.setPlaying)
  const setPaused = usePlayerStore((state) => state.setPaused)
  const setSrc = usePlayerStore((state) => state.setSrc)

  const handleOnPlay = (src) => {
    if (src === playingSrc) {
      isPlaying ? setPaused() : setPlaying()
    } else {
      setSrc(src)
    }
  }

  return (
    <div className="container">
      <div className="inner">
        <h1>Home</h1>
        Custom Player #2 made in React (no audio html tag)
        <br />
        Currently doesn't stop when the other player is playing.
        <br />
        <br />
        <AudioPlayer src={ALL_SONGS[0].src} />
        <br />
        <br />
        <br />
        <br />
        <div className="grid">
          {ALL_SONGS.map(({ id, title, src }) => (
            <div className="grid__item" key={id}>
              <Link to={`/song/${id}`}>
                <h2>{title}</h2>
              </Link>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  handleOnPlay(src)
                }}
              >
                {playingSrc === src && isPlaying ? 'Pause' : 'Play'}
              </button>
            </div>
          ))}
        </div>
        <ChangeLayout />
      </div>
    </div>
  )
}
