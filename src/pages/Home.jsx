import React from 'react'
import { Link } from 'react-router-dom'
import ALL_SONGS from '../data/playlist'

export default function HomePage() {
  return (
    <div className="container">
      <div className="inner">
        <h1>Home</h1>
        <div className="grid">
          {ALL_SONGS.map(({ id, title }) => (
            <div className="grid__item" key={id}>
              <Link to={`/song/${id}`}>
                <h2>{title}</h2>
              </Link>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  setPlaySongId(id)
                }}
              >
                Play
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
