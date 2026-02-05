/* Para manana queda pendiente optimizar el codigo, usando objeto que almacene los estados de los dias

{
  0: false,  // Domingo
  1: true,   // Lunes
  2: false,  // Martes
  ...
}
*/

import { createContext, useState, useEffect } from 'react';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
    // 1. El estado ahora vive AQUÍ, fuera de Timer.jsx
    const [timerComplete, setTimerComplete] = useState(0);

    const [domingo, setDomingo] = useState(false);
    const [lunes, setLunes] = useState(false);
    const [martes, setMartes] = useState(false);
    const [miercoles, setMiercoles] = useState(false);
    const [jueves, setJueves] = useState(false);
    const [viernes, setViernes] = useState(false);
    const [sabado, setSabado] = useState(false);

    const todayIs = new Date().getDay();
    console.log("El dia de hoy es: ", todayIs);

    useEffect(() => {
        if (timerComplete > 0) {
            switch (todayIs) {
                case 0:
                    setDomingo(true);
                    break;
                case 1:
                    setLunes(true);
                    break;
                case 2:
                    setMartes(true);
                    break;
                case 3:
                    setMiercoles(true);
                    break;
                case 4:
                    setJueves(true);
                    break;
                case 5:
                    setViernes(true);
                    break;
                case 6:
                    setSabado(true);
                    break;
            }
            // localStorage.setItem('timerComplete', timerComplete);
        }
    }, [timerComplete]);

    return (
        <TimerContext.Provider value={{ timerComplete, setTimerComplete, domingo, lunes, martes, miercoles, jueves, viernes, sabado }}>
            {children}
        </TimerContext.Provider>
    );
};