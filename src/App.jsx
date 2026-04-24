import { Routes, Route } from 'react-router-dom'
import Landing from './Landing'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      {/* Placeholder routes so navbar/CTAs don't 404 in v0 preview. Replace in prod. */}
      <Route path="/trade" element={<Landing />} />
      <Route path="/copytrade" element={<Landing />} />
      <Route path="/markets" element={<Landing />} />
      <Route path="/docs" element={<Landing />} />
      <Route path="/legal" element={<Landing />} />
      <Route path="*" element={<Landing />} />
    </Routes>
  )
}
