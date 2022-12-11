import React from 'react'
import { Link, useParams } from 'react-router-dom'

export default function SongPage() {
  const { songId } = useParams()

  return (
    <div className="container">
      <div className="inner">
        <Link to="/">Back to homepage</Link>
        <h1>Single page</h1>
        <p>Song ID: {songId}</p>
      </div>
    </div>
  )
}
