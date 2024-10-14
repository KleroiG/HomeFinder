import Header  from './components/Header';
import AgregarInmueble from './components/AgregarInmueble';
import Inmuebles from './components/Inmuebles';


function App() {
  return (
    <>
      <div className="container">
        <h1 className="text-4xl font-bold text-red-500 text-center m-5">
        </h1>
        <Header/>
        {/*<AgregarInmueble/>*/}
        <Inmuebles/>
      </div>
    </>
  )
}

export default App
