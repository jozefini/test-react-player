import React from 'react'
import usePlayerStore from '../store/store'

export default function ChangeLayout() {
  const hasSrc = usePlayerStore((state) => state.src)
  const setPlayerLayout = usePlayerStore((state) => state.setPlayerLayout)
  const setSrc = usePlayerStore((state) => state.setSrc)
  return (
    <>
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
      {hasSrc && (
        <div className="change-layouts">
          <button
            onClick={() => {
              setSrc('')
            }}
          >
            Stop player
          </button>
        </div>
      )}
    </>
  )
}
