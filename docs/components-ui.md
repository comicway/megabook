# Componentes UI 🎨

Los componentes de MegaBook están diseñados para ser modulares y consumir datos directamente del Contexto.

## `DailyStreak.jsx`

Visualiza el progreso semanal y la racha actual.
- Muestra el número de Timers y Días de racha.
- Renderiza 7 checks (D, L, M, M, J, V, S) que se marcan al completar el objetivo diario.
- Usa `liveStreak` para asegurar que el usuario vea la información real de su constancia.

## `Timer.jsx`
El motor de actividad de la aplicación.
- Permite iniciar y detener sesiones de tiempo.
- Al finalizar, dispara la actualización del estado global.

## `App.jsx`
Componente raíz que orquestra la estructura visual y envuelve todo en el `TimerProvider`.
