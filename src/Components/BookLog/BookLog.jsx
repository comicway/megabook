import React, { useState } from 'react';

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
   
    console.log(localBook);
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