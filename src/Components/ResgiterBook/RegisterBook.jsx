import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState, useEffect } from 'react';

const validate = (values) => {

    const errors = {};
    if (!values.book) {
        errors.book = 'El nombre del libro es requerido';
    }
    return errors;
};

const RegisterBook = () => {

    const [successMessage, setSuccessMessage] = useState('');

    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchBookData = async () => {

            const apiKey = 'AIzaSyBzpG3HDLwYjHSYiEPJxgKVTyOizFL33cY';
            const query = "Isaac Asimov";
            const encodedQuery = encodeURIComponent(query);

            const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodedQuery}&key=${apiKey}`;

            try {}


        };

    }, []);
    
    return (
        <>
            <div className="container mx-auto px-2 mt-[20px]">
                    <div className="grid grid-cols-1">
                        <Formik
                            initialValues={{ 
                                book: ''
                            }}
                            validate={validate}
                            onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          try {
            const jsonData = JSON.stringify(values);
            localStorage.setItem('bookFormData', jsonData);
            setSuccessMessage(`¡Gracias, ${values.autor}! Tu libro ha sido registrado.`);
            resetForm();
          } catch (error) {
            console.error("No se pudo guardar en localStorage", error);
            setSuccessMessage('Hubo un error al guardar los datos.');
          }
          setSubmitting(false);
       setTimeout(() => setSuccessMessage(''), 5000);

          }, 1000); // 1 segundo de demora
        }}
                        >
                        {({ isSubmitting}) => (
                            <Form className='container mx-auto'>
                                <div>
                                    <Field className="border" name="book" type="text" placeholder="Titulo del libro*"></Field>
                                </div>
                                <div className="text-[#BF3A0A] flex justify-center">
                                    <ErrorMessage name="book"/>
                                </div>
                                <div className="flex justify-center">
                            <button
                                type="submit"
                                className=""
                                disabled={isSubmitting}
                            >
                               {isSubmitting ? 'Enviando...' : 'Guardar libro'}
                            </button>
                        </div>
                            </Form>
                        )} 
                        </Formik>
                        {successMessage && (
                            <div style={{ marginTop: '1rem', color: 'green', fontWeight: 'bold' }}>
                                    {successMessage}
                            </div>
                        )}       
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