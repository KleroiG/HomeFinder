import { useEffect, useState } from 'react';

const mapUserToProduct = (user: any) => ({
  id: user.id,
  name: user.nombre, // Campo de la base de datos
  href: '#',
  price: `$${user.contrasena}`, // Sustituye con el campo adecuado
  imageSrc: 'https://via.placeholder.com/150',
  imageAlt: `Imagen de ${user.nombre}`,
});

export default function Example() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/inmuebles'); // Llama al backend
        const users = await response.json();
        console.log('Datos obtenidos de la API:', users); // Verifica los datos
        const mappedProducts = users.map(mapUserToProduct);
        setProducts(mappedProducts);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <a key={product.id} href={product.href} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  alt={product.imageAlt}
                  src={product.imageSrc}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
