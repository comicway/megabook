import { useState } from "react";

const Timer = () => {

    const [countdownStarted, setCountdownStarted] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(0);

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

    const formatearMinutos = (minutos) => {
       
        const minutosTexto = String(minutos);

        const minutosConCero = minutosTexto.padStart(2, '0');

        return `${minutosConCero}:00`;
    };

    useEffect(() => {
        // Solo iniciamos si el contador es mayor a 0
        if (countdownStarted && timeRemaining > 0) {

            const countdownInterval = setInterval(() => {

                // PISTA CLAVE:
                // En lugar de calcular fechas, usamos la función de actualización
                // de React para acceder al valor anterior (prevTime)
                setTimeRemaining((prevTime) => {
                    const nuevoTiempo = prevTime - 1000;

                    // Si llegamos a 0 o menos, devolvemos 0
                    return nuevoTiempo > 0 ? nuevoTiempo : 0;
                });

            }, 1000);

            return () => clearInterval(countdownInterval);
        }
    }, [countdownStarted, timeRemaining]); // Dependencias

    return (
        <>
            <div className="container mx-auto px-2 mt-[20px]">
                <div className="grid grid-cols-1 text-center">
                    <p className="text-[54px]">{formatearMinutos(timeHabit.time)}</p>
                </div>
                <div className="grid grid-cols-2">
                    <button className="w-[98%]">STOP</button>
                    <button className="w-[98%]">PAUSA</button>
                </div>
            </div>
        </>
    );
}

export default Timer