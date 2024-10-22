import Header from "./Header"
import Inmuebles from "./Inmuebles"
import Footer from "./Footer"
import Carrusel from "./Carrusel"
import Search from "./Search"
import DarkMode from './DarkMode';

function Index() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <div className="p-4"></div>
        </main>

        <Header />
        <Carrusel />
        <Search />
        <Inmuebles />
        <DarkMode />
        <Footer />
      </div>
    </>
  )
}

export default Index
