import React, { useEffect, useRef, useState } from 'react'

// hh:mm:ss.
const secondsToTime = (seconds) => {
  const date = new Date(seconds * 1000)
  const hh = date.getUTCHours()
  const mm = date.getUTCMinutes()
  const ss = date.getSeconds()

  if (hh) {
    return `${hh}:${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`
  }
  return `${mm}:${ss.toString().padStart(2, '0')}`
}

const PlayIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    height={24}
    width={24}
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
    />
  </svg>
)

const PauseIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    height={24}
    width={24}
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 5.25v13.5m-7.5-13.5v13.5"
    />
  </svg>
)

const VolumeOnIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    height={24}
    width={24}
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
    />
  </svg>
)

const VolumeOffIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    height={24}
    width={24}
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
    />
  </svg>
)

export default function AudioPlayer({ src }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [volume, setVolume] = useState(100)
  const [isMuted, setIsMuted] = useState(false)
  const [dragTime, setDragTime] = useState(0)

  const playerTime = dragTime || currentTime

  const onPlayPauseClick = () => {
    if (!audioRef.current) return

    isPlaying ? audioRef.current.pause() : audioRef.current.play()
    setIsPlaying(!isPlaying)
  }

  const onVolumeChange = (e) => {
    if (!audioRef.current) return
    const volumeNow = parseInt(e.target.value)
    audioRef.current.volume = volumeNow / 100
    setVolume(volumeNow)
    setIsMuted(volumeNow === 0)
  }

  const onTimeChange = (e) => {
    if (!audioRef.current) return
    const timeNow = parseInt(e.target.value)
    setDragTime(timeNow)
    setCurrentTime(timeNow)
  }

  const onTimeChangeEnd = (e) => {
    audioRef.current.currentTime = dragTime
    setCurrentTime(dragTime)
    setDragTime(0)
  }

  const toggleMuted = () => {
    if (!audioRef.current) return
    audioRef.current.muted = !audioRef.current.muted
    setIsMuted(!isMuted)
  }

  useEffect(() => {
    if (!src) return

    const audio = new Audio(src)
    audioRef.current = audio

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }
    const onLoadedMetadata = () => {
      setDuration(audio.duration)
    }
    const onEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }
    const onLoading = () => {
      setIsLoading(true)
    }
    const onCanPlay = () => {
      setIsLoading(false)
    }

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('loadstart', onLoading)
    audio.addEventListener('canplay', onCanPlay)
    audio.addEventListener('waiting', onLoading)
    audio.addEventListener('playing', onCanPlay)

    return () => {
      audio.pause()
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('loadstart', onLoading)
      audio.removeEventListener('canplay', onCanPlay)
      audio.removeEventListener('waiting', onLoading)
      audio.removeEventListener('playing', onCanPlay)
      audioRef.current = null
    }
  }, [src])

  return (
    <div className="player">
      <div className="player__controls">
        <button className="player__play-btn" onClick={onPlayPauseClick}>
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
      </div>
      <div className="player__progress">
        <span className="player__progress-current">{secondsToTime(playerTime)}</span>
        <div className="player__progress-wrap">
          <input
            className="player__progress-input"
            type="range"
            min="0"
            max={duration}
            value={playerTime}
            onChange={onTimeChange}
            onMouseUp={onTimeChangeEnd}
            style={{ '--seek-before-width': `${(playerTime / duration) * 100}%` }}
          />
        </div>
        <span className="player__progress-total">{secondsToTime(duration)}</span>
      </div>
      <div className="player__volume">
        <button className="player__volume-btn" onClick={toggleMuted}>
          {isMuted ? <VolumeOffIcon /> : <VolumeOnIcon />}
        </button>
        <input
          className="player__volume-input"
          type="range"
          min="0"
          max="100"
          value={isMuted ? 0 : volume}
          style={{ '--seek-before-width': `${isMuted ? 0 : volume}%` }}
          onChange={onVolumeChange}
        />
      </div>
    </div>
  )
}
