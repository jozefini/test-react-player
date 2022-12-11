import React from 'react'
import { useParams } from 'react-router-dom'

export default function SongPage() {
  const { songId } = useParams();
  return (
    <div className="container">
      <div className="inner">
        <h1>Song ID: {songId || 'NaN'}</h1>
      </div>
    </div>
  )
}
