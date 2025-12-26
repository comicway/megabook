import React, { useEffect, useState } from 'react';

/* Inicio rescatar datos de la LocalStorage */

const CLAVE_STORAGE = 'miConfiguracionRadio';

const BookLog = () => {

    const [localBook, setlocalBook] = useState(() => {
    
    try {
      const stringGuardado = localStorage.getItem(CLAVE_STORAGE);
      
      if (stringGuardado === null) {
        return [];
      }
      
      return JSON.parse(stringGuardado);

    } catch (error) {
      console.error("Error al leer localStorage", error);
      return [];
    }
  });
   
    console.log('Informacion en el locaStorage:', localBook);

    /* Inicio sacar datos del Google Books */

    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState(localBook);
    const [books, setBooks] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => { 

        if (!query) { 
            setLoading(false); 
            return;  /* Detiene todo si no hay nada que buscar */
        } 

        const fetchBookData = async () => {

            setLoading(true);

            const apiKey = 'AIzaSyBzpG3HDLwYjHSYiEPJxgKVTyOizFL33cY';
            const encodedQuery = encodeURIComponent(query);

            const librosEncontrados = [];

            try {

                for (const id of query) {

                    const apiUrl = `https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}`;

                    const response = await fetch(apiUrl)

                    /* console.log("Mira el objeto response:", response);
                    console.log("¿Es un array?:", Array.isArray(response)); */

                    const data = await response.json();

                    librosEncontrados.push(data);
                }

                setlocalBook(librosEncontrados);

                /*if (!librosEncontrados.ok) {
                    throw new Error('Error al conectar con Google Books');
                }*/

                if (librosEncontrados.length > 0) {
                    setlocalBook(librosEncontrados);
                } else {
                    throw new Error('No se encontraron libros con esos IDs.')
                }
                return librosEncontrados;
            } catch (err) {
                setError("setError catch: " + err.message);
            } finally {
                setLoading(false);
            }

        };
        fetchBookData();
        
        }, [query]);

        if (error) {
            return <div>Error - {error}</div>;
        }

    return (
        <>
            <div className="container mx-auto px-2 mt-[8px]">
                    <div className="flex justify-between items-center">
                        <div>
                            <p>Libros</p>
                        </div>
                        <div>
                            <button>Cargar</button>
                        </div>
                    </div>
            </div>
            <div className="container mx-auto px-2 mt-[8px]">
                <div className="">
                    <div className="grid gap-3 grid-cols-4 lg:grid-cols-6">
                            {localBook.map((book, index) => (
                                <div className="book-card" key={book.id || index}>
                                     <img src={book.volumeInfo?.imageLinks.thumbnail || 'No hay imagen'} alt={`Portada de ${book.volumeInfo?.title || 'Título Desconocido'}`} />
                                    {book.volumeInfo?.title || 'Título Desconocido'}
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookLog;