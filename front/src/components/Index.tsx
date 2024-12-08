
import Inmuebles from "./Inmuebles"
import Carrusel from "./Carrusel"


function Index() {
  return (
    <>
      <div className="flex flex-col min-h-screen dark:bg-gray-800">
        <main className="flex-grow">
          <div className="p-4"></div>
        </main>
        <Carrusel />
        <Inmuebles />
      </div>
    </>
  )
}

export default Index
