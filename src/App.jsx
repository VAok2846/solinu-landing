import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      {/* Stubs so navbar/CTAs do not 404 in the preview */}
      <Route path="*" element={<Landing />} />
    </Routes>
  )
}
