import React, { useState, useEffect } from 'react';

const BookLog = () => {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchBookData = async () => {
            
            const apiKey = 'AIzaSyBzpG3HDLwYjHSYiEPJxgKVTyOizFL33cY';
            const query = "yo robot";
            const encodedQuery = encodeURIComponent(query);

            const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodedQuery}&key=${apiKey}`;

            try {
                const response = await fetch(apiUrl);

                if (!response.ok) {
                    throw new Error('No se pudo obtener la respuesta de la API');
                }

                const data = await response.json();

                if (data.items && data.items.length > 0) {
                    setBooks(data.items);
                } else {
                    throw new Error('No se encontraron libros con este titulo.');
                }
                return data;

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }

        };
        fetchBookData();

    }, []);

   if (loading) {
    return <div>Cargando libro...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!books) {
    return null;
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
                    <div className="grid gap-3 grid-cols-3 lg:grid-cols-4">
                        {books.map((book) => (
                            <div className="book-card" key={book.id}>
                                {book.volumeInfo.imageLinks?.thumbnail && (
                                    <img src={book.volumeInfo.imageLinks.thumbnail} alt={`Portada de ${book.volumeInfo.title}`}/>
                                 )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookLog;