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

            const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodedQuery}&key=${apiKey}`;

            try {
                
                const response = await fetch(apiUrl);

                if (!response.ok) {
                    throw new Error('Error al conectar con Google Books');
                }
                const data = await response.json();

                if (!data.ok) {
                    throw new Error('Probando');
                }

                if (data.items && data.items.length > 0) {
                    setlocalBook(data.items);
                } else {
                    throw new Error('No se encontraron libros con este titulo.')
                }
                return data;
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }

        };
        fetchBookData();
        
        }, [query]);

        if (error) {
            return <div>Error: {error}</div>;
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
                    <div className="grid gap-3 grid-cols-4 lg:grid-cols-8">
                        <ul>
                            {localBook.map((book, index) => (
                                <li key={index}>{book}</li>
                            ))}
                        </ul>
        {localBook.length === 0 && <p>No se encontraron libros.</p>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookLog;