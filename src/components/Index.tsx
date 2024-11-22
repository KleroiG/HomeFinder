
import Inmuebles from "./Inmuebles"
import Carrusel from "./Carrusel"
import Search from "./Search"


function Index() {
  return (
    <>
      <div className="flex flex-col min-h-screen dark:bg-gray-800">
        <main className="flex-grow">
          <div className="p-4"></div>
        </main>
        <Carrusel />
        <Search />
        <Inmuebles />
      </div>
    </>
  )
}

export default Index
