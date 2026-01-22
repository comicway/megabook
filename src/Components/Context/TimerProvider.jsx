import { createContext, useState } from 'react';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
    // 1. El estado ahora vive AQUÍ, fuera de Timer.jsx
    const [timerComplete, setTimerComplete] = useState(0);

    return (
        <TimerContext.Provider value={{ timerComplete, setTimerComplete }}>
            {children}
        </TimerContext.Provider>
    );
};