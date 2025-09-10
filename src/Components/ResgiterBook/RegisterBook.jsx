import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';

const validate = (values) => {
    const errors = {};
    if (!values.book) {
        errors.book = 'El nombre del libro es requerido';
    }
    if (!values.autor) {
        errors.autor = 'El nombre del autor es requerido';
    } else if (!/[a-zA-Z\s]+$/i.test(values.autor)) {
        errors.autor = 'Solo se permiten letras';
    }
    if (!values.ISBN) {
        errors.ISBN = 'El codigo ISBN es requerido';
    } else if (!/^[0-9]+$/i.test(values.ISBN)) {
        errors.ISBN = 'Solo se permiten numeros';
    }
    return errors;
};

const RegisterBook = () => {
    const [successMessage, setSuccessMessage] = useState('');
    
    return (
        <>
            <div className="container mx-auto px-2 mt-[20px]">
                    <div className="grid grid-cols-1">
                        <Formik
                            initialValues={{ 
                                book: '', 
                                autor: '', 
                                ISBN: '' 
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
                                    <Field name="book" type="text" placeholder="Titulo del libro*"></Field>
                                </div>
                                <div className="text-[#BF3A0A] flex justify-center">
                                    <ErrorMessage name="book"/>
                                </div>
                                <div>
                                    <Field name="autor" type="text" placeholder="Nombre del autor*"></Field>
                                </div>
                                <div className="text-[#BF3A0A] flex justify-center">
                                    <ErrorMessage name="autor"/>
                                </div>
                                <div>
                                    <Field name="ISBN" type="text" placeholder="ISBN del libro*"></Field>
                                </div>
                                <div className="text-[#BF3A0A] flex justify-center">
                                    <ErrorMessage name="ISBN"/>
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