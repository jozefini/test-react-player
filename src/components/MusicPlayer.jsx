import React, { useEffect, useRef } from 'react'
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import usePlayerStore from '../store/store'

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
          <a href={src} download>
            Download
          </a>
        </div>
      )}
    </div>
  )
}
