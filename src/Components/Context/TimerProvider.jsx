/*
Con la lógica actual, la racha se basa en los 7 días que ves en pantalla. Eso significa que el domingo (cuando el objeto days se limpie), la racha volverá a ser 0 (o 1 si completas el domingo) porque la función ya no "ve" el sábado pasado.

Mañana trabar en cómo hacer que ese número totalStreak "recuerde" que venías de una racha de la semana pasada para que siga sumando (8, 9, 10...)

Pero primero repasar toda la logica del TimerProvider

*/

import { createContext, useState, useEffect } from 'react';
import { calculateStreak } from '../../logic/streak';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {

    // timerComplete en 0 si no hay nada en el localStorage

    const [timerComplete, setTimerComplete] = useState(() => {
        try {
            const numGuardado = Number(localStorage.getItem('timerKey'));
            return numGuardado ? numGuardado : 0;
        } catch (error) {
            console.error("¡Error al parsear! El JSON estaba corrupto:", error);
            return 0;
        }

    });

    const [lastTimerCount, setLastTimerCount] = useState(() => {
        try {
            const numGuardado = Number(localStorage.getItem('lastTimerKey'));
            return numGuardado ? numGuardado : 0;
        } catch (error) {
            console.error("¡Error al parsear! El JSON estaba corrupto:", error);
            return 0;
        }

    });

    // Los dias de semana como false en el localStorage

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

    // dayNames los dias de la semana en un array

    const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    const todayIs = new Date().getDay();
    console.log("El dia de hoy es: ", todayIs);

    // currentDayName es el dia de hoy

    const currentDayName = dayNames[todayIs];

    // totalStreak tomando del localStorage

    const [totalStreak, setTotalStreak] = useState(() => {
        return Number(localStorage.getItem('totalStreak')) || 0;
    });

    const lastWeek = Number(localStorage.getItem('WeekNumber'));

    console.log("La semana pasada fue: ", lastWeek);

    // getWeekNumber para obtener el numero de la semana actual

    const getWeekNumber = (date) => {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    };

    // currentWeek es la semana actual

    const currentWeek = getWeekNumber(new Date());

    console.log("La semana actual es: ", currentWeek);

    // useEffect para cuando empieza una nueva semana

    useEffect(() => {

        // const isNewWeek = todayIs === 0 && (days.monday || days.tuesday || days.wednesday || days.thursday || days.friday || days.saturday);

        localStorage.setItem('WeekNumber', JSON.stringify(currentWeek));

        if (lastWeek !== currentWeek) {

            setDays({
                sunday: false,
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false
            });

            setLastTimerCount(timerComplete);
        }

    }, []);

    // useEffect para cuando se completa el timer

    useEffect(() => {

        if (timerComplete > 0 && days[currentDayName] == false && lastTimerCount < timerComplete) {

            const updatedDays = { ...days, [currentDayName]: true };

            setDays(updatedDays);

            setLastTimerCount(timerComplete);

            const newStreak = calculateStreak(updatedDays, todayIs);

            setTotalStreak(newStreak);
        }

        localStorage.setItem('timerKey', JSON.stringify(timerComplete));

        localStorage.setItem('daysFalses', JSON.stringify(days));

        localStorage.setItem('totalStreak', totalStreak.toString());

        localStorage.setItem('lastTimerKey', JSON.stringify(lastTimerCount));

    }, [timerComplete, days, totalStreak, lastTimerCount]);

    console.log("Informacion del localStorage key timerKey: ", timerComplete);

    return (
        <TimerContext.Provider value={{ timerComplete, setTimerComplete, days, setDays, totalStreak, setTotalStreak }}>
            {children}
        </TimerContext.Provider>
    );
};