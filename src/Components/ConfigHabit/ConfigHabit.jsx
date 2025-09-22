import {Formik, Form, Field, ErrorMessage} from 'formik';
import { useState } from 'react';

const validate = (values) => {
    const errors = {};

    if (!values.habitpre) {
        errors.habitpre = 'Por favor, selecciona un habito';
    }

    return errors;
};

const ConfigHabit = () => {

    const [successMessage, setSuccessMessage] = useState('');

    return (
        <>
        <div className="container mx-auto px-2 mt-[20px]">
            <div className="grid grid-cols-1">
                <h1>Selecciona un habito previo</h1>
                <p>Los habitos que ya forman parte de tu rutina, como cepillar los dientes, suelen servir de potenciadores para habitos nuevos. El habito de lectura puede ir antes o despues de estos habitos previos. Te recomiendo empezar con un tiempo menor, de 5 a 10 minutos de lectura, y luego ir aumentando a lo largo del tiempo.</p>
            </div>
            <div className='grid gird-cols-1'>
                <Formik
                    initialValues={{habitpre:'',}}
                    validate={validate}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        setTimeout(() => {
                            try {
                                const jsonData = JSON.stringify(values);
                                localStorage.setItem('habitData', jsonData);
                                setSuccessMessage('Configurado pre habito');
                                resetForm();
                            } catch (error) {
                                console.error("No se puede guardar en localStorage",error);
                                setSuccessMessage("Hubo un error al guardar los datos");
                            }
                            setSubmitting(false);
                            setTimeout(() => setSuccessMessage(''), 5000);
                        }, 1000);
                    }}
                >
                {({ isSubmitting, isValid }) => (
                    <Form>
                        <Field as="select" name="habitpre" id="habitpre">
                            <option value="" disabled>Selecciona una opcion...</option>
                            <option value="antesdesayuno">Antes del desayuno</option>
                            <option value="despuescepillar">Despues de cepillarte</option>
                            <option value="antesejercicio">Antes de hacer ejercicio</option>
                            <option value="antesdesiesta">Antes de la siesta</option>
                        </Field>
                        <ErrorMessage name="habitpre" component="div"/>
                        <div className='flex justify-center'>
                            <button type="submit" disabled={isSubmitting || !isValid} >
                                {isSubmitting ? 'Enviando...' : 'Guardar'}
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

export default ConfigHabit