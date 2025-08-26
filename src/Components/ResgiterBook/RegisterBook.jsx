import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const validate = (values) => {
    const errors = {};
    if (!value.book) {
        error.book = 'El nombre del libro es requerido';
    }
    if (!value.autor) {
        error.autor = 'El nombre del autor es requerido';
    } else if (!/[a-zA-Z\s]+$/i.test(value.autor)) {
        error.autor = 'Solo se permiten letras';
    }
    if (!value.ISBN) {
        error.ISBN = 'El codigo ISBN es requerido';
    } else if (!/^[0-9]+$/i.test(value.ISBN)) {
        erro.ISBN = 'Solo se permiten numeros';
    }
    return error;
};

const RegisterBook = () => {
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
                        >
                        {({ issSubmitting}) => (
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
                            >
                                Enviar
                            </button>
                        </div>
                            </Form>

                        )} 
                        </Formik>       
                    </div>
            </div>
        </>
    );
}

export default RegisterBook;