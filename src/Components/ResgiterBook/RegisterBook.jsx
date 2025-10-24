import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState, useEffect } from 'react';

const validate = (values) => {

    const errors = {};
    if (!values.title) {
        errors.title = 'El titulo del libro es requerido';
    }
    return errors;
};

const RegisterBook = () => {

    const [query, setQuery] = useState('');

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const STORAGE_KEY = 'miConfiguracionRadio';


    const [inputValue, setInputValue] = useState(() => {
        const valorGuardado = localStorage.getItem(STORAGE_KEY);
        return valorGuardado || '';
    });

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const [mensaje, setMensaje] = useState('');

    const handleSave = () => {
        try {
            localStorage.setItem(STORAGE_KEY, inputValue);
            setMensaje(`'${inputValue}' guardado con exito`);

            setTimeout(() => setMensaje(''), 3000);
        } catch (error) {
            setMensaje('Error al guardar');
            console.error("Error al guardar en localStorage", error);
        }
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
                                            type="radio"
                                            id={book.id}
                                            name="book"
                                            value={book.id}
                                            checked={inputValue === book.id}
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
                            {mensaje && <p style={{ color: 'green', marginTop: '10px' }}>{mensaje}</p>}
                            <p style={{ marginTop: '10px' }}>
                                Selección actual (en React): <strong>{inputValue || 'Ninguna'}</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    export default RegisterBook;