import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";

const validate = (value) => {
    const error = {};
    if (!value.time) {
        error.time = 'El tiempo es requerido'
    } else if (!/^[0-9]+$/i.test(value.time)) {
        error.time = 'Solo se permiten numeros';
    }
    return error; 
};

const ReadBook = () => {
    const [successMessage, setSuccessMessage] = useState('');

    const [ timeHabit, setTimeHabit ] = useState(() => {

        try {
            const timeGuardado = localStorage.getItem('timeFormData');
            return timeGuardado ? JSON.parse(timeGuardado) : [];
        } catch (error) {
            console.error("¡Error al parsear! El JSON estaba corrupto:", error);
            return [];
        }
    });

    console.log ("aqui la data del tiempo ", timeHabit);

    return (
        <>
            <div className="container mx-auto px-2 mt-[20px]">
                <div className="grid grid-cols-1">
                    <h1>{timeHabit.time} min</h1>
                    <p>Cuantos minutos quieres leer?</p>
                </div>
                <div className="grid grid-cols-1">
                    <Formik
                    initialValues={{time:''}}
                        validate={validate}
                        onSubmit={(value, {setSubmitting, resetForm}) => {
                            setTimeout(()=>{
                                try {
                                    const jsonData = JSON.stringify(value);
                                    localStorage.setItem('timeFormData',jsonData);
                                    setSuccessMessage('¡Gracias, tu tiempo ha sido registrado.');
                                    resetForm();
                                } catch (error) {
                                    console.error("No se puede registrar un tiempo", error);
                                    setSuccessMessage('Hubo un error al guardar los datos');
                                }
                                setSubmitting(false);
                                setTimeout(() => setSuccessMessage(''), 5000);
                            }, 1000); // 1 segundo de demora
                        }} >
                            {({isSubmitting}) => (
                                <Form className="container mx-auto">
                                    <div>
                                        <Field className="border" name="time" type="text" placeholder="Ejemplo 25 min"></Field>
                                    </div>
                                    <div className="text-[#BF3A0A] flex justify-center">
                                        <ErrorMessage name="time"/>
                                    </div>
                                    <div className="flex justify-center">
                                        <button type="submit" disabled={isSubmitting}>
                                            {isSubmitting ? 'Enviando...' : 'Resgistrar tiempo'}
                                        </button>
                                    </div>
                                </Form>
                            )}
                    </Formik>
                    {successMessage && (
                        <div className="mx-[5px] text-gren font-bold">{successMessage}</div>
                    )}
                </div>
            </div>
        </>
    );
}

export default ReadBook