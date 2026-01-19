import { useState, useEffect } from "react";

const Timer = () => {

    const [countdownStarted, setCountdownStarted] = useState(false);
    /* const [timeRemaining, setTimeRemaining] = useState(0); */

    const [segundosTotales, setSegundosTotales] = useState(59);


    const [ timeHabit, setTimeHabit ] = useState(() => {
    
            try {
                const timeGuardado = localStorage.getItem('timeFormData');
                return timeGuardado ? JSON.parse(timeGuardado) : {};
            } catch (error) {
                console.error("¡Error al parsear! El JSON estaba corrupto:", error);
                return {};
            }
    });

    const [minutosTotales, setMinutosTotales] = useState(() => {
        
        const tiempoCrudo = timeHabit?.time || 0;
        
        return (Number(tiempoCrudo));

    });

        console.log ("aqui la data del tiempo ", timeHabit);

    /* const formatearMinutos = (minutos) => {
       
        const minutosTexto = String(minutos);

        const minutosConCero = minutosTexto.padStart(2, '0');

        return `${minutosConCero}:00`;
    }; */

    const handleStarted = () => {
   
        /*const tiempoCrudo = timeHabit?.time || 0;
        
        setSegundosTotales(Number(tiempoCrudo) * 60);

        setMinutosTotales(Number(tiempoCrudo));

        setTimeRemaining(segundosTotales);*/

        setCountdownStarted(true);
    };

    console.log("Segundos Totales: ", segundosTotales);
    console.log("Minutos Totales: ", minutosTotales);

    const handleStop = () => {
        setCountdownStarted(false);
        setSegundosTotales(0);
        setMinutosTotales(0);
        /* setTimeRemaining(0); */
    };

    useEffect(() => {

        let intervalo = null;

        if (countdownStarted && minutosTotales > 0) {

            intervalo = setInterval(() => {

                if (segundosTotales > 0) {

                    setSegundosTotales((prevSegundos) => prevSegundos - 1);

                    if (segundosTotales == 1) {

                        setMinutosTotales(minutosTotales - 1);

                    }

                } else {
                    setSegundosTotales(59);
                }

            }, 1000);

        } else if (segundosTotales == 0 && minutosTotales == 0) {

            setCountdownStarted(false);

        }
        return () => { if (intervalo) clearInterval(intervalo); };

    }, [countdownStarted, segundosTotales, minutosTotales]);

    return (
        <>
            <div className="container mx-auto px-2 mt-[20px]">
                <div className="grid grid-cols-1 text-center">
                    {/*<p className="text-[54px]">{formatearMinutos(timeRemaining)}</p>*/}
                    {/*<p className="text-[54px]">{timeRemaining}</p>*/}
                    <p className="text-[54px]">{minutosTotales}:{segundosTotales}</p>
                </div>
                <div className="grid grid-cols-2">
                    <button onClick={handleStop} className="w-[98%]">STOP</button>
                    <button onClick={handleStarted} className="w-[98%]">PLAY</button>
                </div>
            </div>
        </>
    );
}

export default Timer