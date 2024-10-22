import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import AgregarInmueble from "./components/AgregarInmueble"
import Inmuebles from "./components/Inmuebles"
import Index from "./components/Index"
import Login from "./components/Login"
import Register from "./components/Register"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/agregarInmueble" element={<AgregarInmueble />} />
        <Route path="/Inmuebles" element={<Inmuebles />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
