import Header from "./Header"
import AgregarInmueble from "./AgregarInmueble"
import Inmuebles from "./Inmuebles"
import Footer from "./Footer"
import Carrusel from "./Carrusel"
import Search from "./Search"
import Pruebas from "./Pruebas"

function Index() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <div className="p-4"></div>
        </main>

        <Header />
        <Carrusel />
        {/*<Pruebas/>*/}
        <Search />
        <Inmuebles />
        <Footer />
      </div>
    </>
  )
}

export default Index
