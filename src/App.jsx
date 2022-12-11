import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home'
import SongPage from './pages/Song'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/song/:songId" element={<SongPage />} />
      </Routes>
    </Router>
  )
}

export default App
