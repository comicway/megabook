import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState, useEffect, use } from 'react';

/* Validacion del buscador de libros*/

const validate = (values) => {

    const errors = {};
    if (!values.title) {
        errors.title = 'El titulo del libro es requerido';
    }
    return errors;
};

const RegisterBook = () => {

    const [query, setQuery] = useState(''); /* La informacion campo "Titulo del libro" */

    const [books, setBooks] = useState([]); /* Los datos del libro */
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const STORAGE_KEY = 'miConfiguracionRadio';

    /* Captura los datos del input como array de ids */
    const [inputValue, setInputValue] = useState(() => {
        try {
            const valorGuardado = localStorage.getItem(STORAGE_KEY);
            return valorGuardado ? JSON.parse(valorGuardado) : [];
        } catch (error) {
            console.error("¡Error al parsear! El JSON estaba corrupto:", error);
            return []; // asegurar siempre un array
        }
    });

    /* Toggle para checkboxes: añade o quita el id del array */
    const handleChange = (e) => {
        const id = e.target.value;
        setInputValue(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const [nuevoInput, setNuevoInput] = useState('');

    useEffect(() => {


        localStorage.setItem(STORAGE_KEY, JSON.stringify(inputValue)); /*Prepara las cajas*/

    }, [inputValue]);

    const handleSave = (e) => {
        e.preventDefault();
        if (nuevoInput.trim() === '') return;

        setNuevoInput(prevInput => [...prevInput, nuevoInput]);


    };

    useEffect(() => {

        if (!query) {
            setLoading(false);
            return;
        }

        const fetchBookData = async () => {
            setLoading(true);
            const apiKey = 'AIzaSyBzpG3HDLwYjHSYiEPJxgKVTyOizFL33cY';
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

    }, [query]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <div className="container mx-auto px-2 mt-[20px]">
                <div className="grid grid-cols-1">
                    <Formik
                        initialValues={{
                            title: ''
                        }}
                        validate={validate}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            setQuery(values.title);
                            setSubmitting(false);
                            resetForm();
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className='container mx-auto'>
                                <div>
                                    <Field className="border" name="title" type="text" placeholder="Titulo del libro*"></Field>
                                </div>
                                <div className="text-[#BF3A0A] flex justify-center">
                                    <ErrorMessage name="title" />
                                </div>
                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className=""
                                        disabled={loading}
                                    >
                                        {loading ? 'Cargando libros...' : 'Buscar libro'}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className="container mx-auto px-2 mt-[8px]">
                    <div className="">
                        <div className="grid gap-3 grid-cols-4 lg:grid-cols-8">
                            {books.map((book) => (
                                <div className="book-card" key={book.id}>
                                    <input
                                        type="checkbox"
                                        id={book.id}
                                        name="book"
                                        value={book.id}
                                        checked={inputValue.includes(book.id)}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor={book.id}>
                                        {book.volumeInfo.imageLinks?.thumbnail && (
                                            <img src={book.volumeInfo.imageLinks.thumbnail} alt={`Portada de ${book.volumeInfo.title}`} />
                                        )}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1">
                    <div className="flex justify-center">
                        <button onClick={handleSave} className='button-outline'>Agregar</button>
                    </div>
                    <div>
                        {/* Mostrar selección actual */}
                        <p style={{ marginTop: '10px' }}>
                            Selección actual (en React): <strong>{inputValue.length ? inputValue.join(', ') : 'Ninguna'}</strong>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegisterBook;