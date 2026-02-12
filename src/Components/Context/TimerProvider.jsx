import { createContext, useState, useEffect } from 'react';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {

    const [timerComplete, setTimerComplete] = useState(() => {
        try {
            const numGuardado = Number(localStorage.getItem('timerKey'));
            return numGuardado ? numGuardado : 0;
        } catch (error) {
            console.error("¡Error al parsear! El JSON estaba corrupto:", error);
            return 0;
        }

    });

    const [days, setDays] = useState(() => {
        try {
            const numGuardado = JSON.parse(localStorage.getItem('daysFalses'));
            return numGuardado ? numGuardado : {
                sunday: false,
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false
            };
        } catch (error) {
            console.error("¡Error al parsear! El JSON estaba corrupto:", error);
            return 0;
        }

    });

    const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    const todayIs = new Date().getDay();
    console.log("El dia de hoy es: ", todayIs);

    const currentDayName = dayNames[todayIs];

    useEffect(() => {

        const isNewWeek = todayIs === 0 && (days.monday || days.tuesday || days.wednesday || days.thursday || days.friday || days.saturday);

        if (isNewWeek) {
            setDays({
                sunday: false,
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false
            });
        }

    }, []);

    useEffect(() => {

        if (timerComplete > 0 && days[currentDayName] == false) {

            setDays(prev => ({ ...prev, [currentDayName]: true }));

        }

        localStorage.setItem('timerKey', JSON.stringify(timerComplete));

        localStorage.setItem('daysFalses', JSON.stringify(days));

    }, [timerComplete, days]);

    console.log("Informacion del localStorage key timerKey: ", timerComplete);

    return (
        <TimerContext.Provider value={{ timerComplete, setTimerComplete, days, setDays }}>
            {children}
        </TimerContext.Provider>
    );
};