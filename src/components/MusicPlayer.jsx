import React, { useEffect, useRef } from 'react'
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import usePlayerStore from '../store/store'

const DownloadIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    strokeWidth={1.6}
  >
    <polyline fill="none" stroke="#000" points="14,10 9.5,14.5 5,10"></polyline>
    <rect x="3" y="17" width="13" height="1.6"></rect>
    <line fill="none" stroke="#000" x1="9.5" y1="13.91" x2="9.5" y2="3"></line>
  </svg>
)

export default function MusicPlayer() {
  const playerRef = useRef(null)
  const src = usePlayerStore((state) => state.src)
  const isPlaying = usePlayerStore((state) => state.isPlaying)
  const setPlaying = usePlayerStore((state) => state.setPlaying)
  const setPaused = usePlayerStore((state) => state.setPaused)
  const layout = usePlayerStore((state) => state.layout)

  const playerClassName = `music-player ${
    src ? 'music-player--active' : 'music-player--hidden'
  }`

  useEffect(() => {
    if (!playerRef.current) {
      return
    }
    if (isPlaying) {
      playerRef.current.audio.current.play()
    } else {
      playerRef.current.audio.current.pause()
    }
  }, [isPlaying, playerRef])

  return (
    <div className={playerClassName}>
      <AudioPlayer
        ref={playerRef}
        src={src}
        layout={layout}
        onPlay={setPlaying}
        onPause={setPaused}
      />
      {src && (
        <div className="media-player__download">
          <a href={src} download target="_blank">
            <DownloadIcon />
          </a>
        </div>
      )}
    </div>
  )
}
