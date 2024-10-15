import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import AgregarInmueble from "./components/AgregarInmueble"
import Index from "./components/Index"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/agregarInmueble" element={<AgregarInmueble />} />
      </Routes>
    </Router>
  )
}

export default App
