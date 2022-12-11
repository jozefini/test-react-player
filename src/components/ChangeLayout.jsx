import React from 'react'
import usePlayerStore from '../store/store'

export default function ChangeLayout() {
  const setPlayerLayout = usePlayerStore((state) => state.setPlayerLayout)
  return (
    <div className="change-layouts">
      <button
        onClick={() => {
          setPlayerLayout('horizontal')
        }}
      >
        Horizontal
      </button>
      <button
        onClick={() => {
          setPlayerLayout('horizontal-reverse')
        }}
      >
        Horizontal Reverse
      </button>
      ...etc
    </div>
  )
}
