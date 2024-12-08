import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import AgregarInmueble from "./components/AgregarInmueble"
import Inmuebles from "./components/Inmuebles"
import Index from "./components/Index"
import Login from "./components/Login"
import Register from "./components/Register"
import Header from "./components/Header"
import Footer from "./components/Footer"
import DarkMode from "./components/DarkMode"
import Team from "./components/Team"
import InmueblesUsuario from "./components/InmueblesUsuario"
import InfoInmueble from "./components/InfoInmueble"
import ReservationsUser from "./components/ReservacionesUsuario"
import Descubrir from "./components/Descubrir"

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/agregarInmueble" element={<AgregarInmueble />} />
        <Route path="/Inmuebles" element={<Inmuebles />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Team" element={<Team />} />
        <Route path="/InmueblesUsuario" element={<InmueblesUsuario />} />
        <Route path="/inmueble/:id" element={<InfoInmueble />} /> 
        <Route path="/reservationsUser" element={<ReservationsUser />} /> 
        <Route path="/Descubrir" element={<Descubrir />} /> 
      </Routes>
      <DarkMode />
      <Footer />
    </Router>
  );
}

export default App;
