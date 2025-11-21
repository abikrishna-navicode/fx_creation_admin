import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Gallery from './pages/Gallery'
import Video from './pages/Video'
import Booking from './pages/Booking'
import Messages from './pages/Messages'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/gallery" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/video" element={<Video />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </Layout>
  )
}
