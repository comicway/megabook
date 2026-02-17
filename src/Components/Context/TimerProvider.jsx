/*

para manana aplicar  "Semana Actual vs Semana Pasada" para que no denpende del domingo


Curiosamente, JavaScript no tiene un getWeek() nativo (así de "olvidadizos" fueron los creadores). Pero es algo que los programadores calculamos con una pequeña fórmula.

Aquí tienes cómo obtener el número de la semana actual (del 1 al 52):

const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

// Uso:
const currentWeek = getWeekNumber(new Date());


*/

import { createContext, useState, useEffect } from 'react';
import { calculateStreak } from '../../logic/streak';

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

    const [totalStreak, setTotalStreak] = useState(() => {
        return Number(localStorage.getItem('totalStreak')) || 0;
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

        localStorage.setItem('totalStreak', totalStreak.toString());

    }, [timerComplete, days]);

    console.log("Informacion del localStorage key timerKey: ", timerComplete);

    return (
        <TimerContext.Provider value={{ timerComplete, setTimerComplete, days, setDays, totalStreak, setTotalStreak }}>
            {children}
        </TimerContext.Provider>
    );
};