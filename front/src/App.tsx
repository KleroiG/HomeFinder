import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import AgregarInmueble from "./components/AgregarInmueble";
import Inmuebles from "./components/Inmuebles";
import Index from "./components/Index";
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DarkMode from "./components/DarkMode";
import Team from "./components/Team";
import InmueblesUsuario from "./components/InmueblesUsuario";
import InfoInmueble from "./components/InfoInmueble";
import ReservationsUser from "./components/ReservacionesUsuario";
import Descubrir from "./components/Descubrir";
import Administrador from "./components/administrador";

function AppLayout() {
  const location = useLocation();
  
  // Condición para ocultar el Header y Footer solo en la ruta "/Administrador"
  const isAdminPage = location.pathname === "/Administrador";

  return (
    <>
      {!isAdminPage && <Header />}
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
        <Route path="/Administrador" element={<Administrador />} />
      </Routes>
      {!isAdminPage && <DarkMode />}
      {!isAdminPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
