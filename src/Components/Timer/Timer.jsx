import { useState } from "react";

const Timer = () => {

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