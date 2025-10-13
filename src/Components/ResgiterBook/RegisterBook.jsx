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

    if (!books) {
        return null;
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
                        <div className="grid gap-3 grid-cols-3 lg:grid-cols-4">
                            {books.map((book) => (
                                <div className="book-card" key={book.id}>
                                    {book.volumeInfo.imageLinks?.thumbnail && (
                                        <img src={book.volumeInfo.imageLinks.thumbnail} alt={`Portada de ${book.volumeInfo.title}`} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1">
                    <div className="flex justify-center">
                        <button className='button-outline'>Regresar</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegisterBook;