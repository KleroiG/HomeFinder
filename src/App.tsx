import Header  from './components/Header';
import AgregarInmueble from './components/AgregarInmueble';
import Inmuebles from './components/Inmuebles';
import Footer from './components/Footer';
import Carrusel from './components/Carrusel';
import Search from './components/Search'
import Pruebas from './components/Pruebas'

function App() {
  return (
    <>
<div className="flex flex-col min-h-screen">
      <main className="flex-grow">

        <div className="p-4">

        </div>
      </main>

      <Header/>
      <Carrusel/>
      {/*<Pruebas/>*/}
      <Search/>
      <Inmuebles/>
      <Footer/>
    </div>

    </>
  )
}

export default App
