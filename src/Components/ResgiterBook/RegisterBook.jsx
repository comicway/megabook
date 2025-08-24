import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const validateBook = value => {
    let error;
    if (!value.book) {
        error = 'El nombre del libro es requerido';
    } 
    return error;
};

const validateAutor = value => {
    let error;
    if (!value.autor) {
        error = 'El nombre del autor es requerido';
    } else if (!/[a-zA-Z\s]+$/i.test(value,autor)) {
        error = 'Solo se permiten letras';
    }
    return error;
};

const validateISBN = value => {
    let error;
    if (!value.ISBN) {
        error = 'El codigo ISBN es requerido';
    } else if (!/^[0-9]+$/i.test(value.ISBN)) {
        error = 'Solo se permiten numeros';
    }
    return error;
};

const RegisterBook = () => {
    return (
        <>
            <div className="container mx-auto px-2 mt-[20px]">
                    <div className="grid grid-cols-1">
                        <Formik
                            initialValues={{ book: '', autor: '', ISBN: '' }}
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                setTimeout(() => {
                                    alert(JSON.stringify(values, null, 2));
                                    setSubmitting(false);
                                    resetForm();
                                }, 400);
                            }}
                        >
                        </Formik>       
                    </div>
            </div>
        </>
    );
}

export default RegisterBook;