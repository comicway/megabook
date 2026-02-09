// Para manana guardar en localStorage el dia de hoy y los checks

import { createContext, useState, useEffect } from 'react';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
    // El estado ahora vive AQUÍ, fuera de Timer.jsx
    const [timerComplete, setTimerComplete] = useState(0);

    const [days, setDays] = useState({
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
    });

    const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    const todayIs = new Date().getDay();
    console.log("El dia de hoy es: ", todayIs);

    const currentDayName = dayNames[todayIs];

    useEffect(() => {
        if (timerComplete > 0) {
            setDays(prev => ({ ...prev, [currentDayName]: true }));
            // localStorage.setItem('timerComplete', timerComplete);
        }
    }, [timerComplete]);

    return (
        <TimerContext.Provider value={{ timerComplete, setTimerComplete, days, setDays }}>
            {children}
        </TimerContext.Provider>
    );
};