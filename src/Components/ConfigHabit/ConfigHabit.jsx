import {Formik, Form, Field, ErrorMessage} from 'formik';

const validate = (values) => {
    const errors = {};

    if (!values.habitpre) {
        errors.habitpre = 'Por favor, selecciona un habito';
    }

    return errors;
};

const ConfigHabit = () => {
    return (
        <>
        <div className="container mx-auto px-2 mt-[20px]">
            <div className="grid grid-cols-1">
                <h1>Selecciona un habito previo</h1>
                <p>Los habitos que ya forman parte de tu rutina, como cepillar los dientes, suelen servir de potenciadores para habitos nuevos. El habito de lectura puede ir antes o despues de estos habitos previos. Te recomiendo empezar con un tiempo menor, de 5 a 10 minutos de lectura, y luego ir aumentando a lo largo del tiempo.</p>
            </div>
            <div className='grid gird-cols-1'>
                <Formik
                    initialValues={{
                        habitpre:'',
                    }}
                    validate={validate}
                    onSubmit={(values, { setSubmitting}) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                {({ isSubmitting, isValid }) => (
                    <Form>
                        <Field as="select" name="habitpro" id="habitpro">
                            <option value="" disabled>Selecciona una opcion...</option>
                            <option value="antesdesayuno">Antes del desayuno</option>
                            <option value="despuescepillar">Despues de cepillarte</option>
                            <option value="antesejercicio">Antes de hacer ejercicio</option>
                            <option value="antesdesiesta">Antes de la siesta</option>
                        </Field>
                        <ErrorMessage name="habitpre" component="div"/>
                        <button type="submit" disabled={isSubmitting || !isValid} >Guardar</button>

                    </Form>
                )}
                </Formik>
            </div>
        </div>
        </>
    );
}

export default ConfigHabit