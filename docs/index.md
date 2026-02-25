# MegaBook - Documentación del Proyecto 📚

MegaBook es una aplicación de seguimiento de hábitos de lectura y productividad diseñada con un enfoque en la persistencia y la gamificación a través de rachas (streaks).

## Características Principales
- **Temporizador de Lectura**: Un timer configurable para sesiones de lectura enfocada.
- **Sistema de Rachas (Streaks)**: Visualización semanal del progreso con persistencia infinita entre semanas.
- **Reseteo Semanal Atómico**: Limpieza automática del tablero cada lunes al iniciar la aplicación.
- **Persistencia Local**: Guardado automático de todo el progreso en el navegador.

## Estructura de la Documentación
- [Sistema de Timer y Estado](./timer-system.md): Detalles sobre el Context Provider y la lógica del temporizador.
- [Lógica de Negocio y Utilidades](./logic-utils.md): Explicación de los algoritmos de rachas y manejo de fechas.
- [Persistencia y Hooks](./persistence.md): Cómo funciona el almacenamiento local y el custom hook `useLocalStorage`.
- [Componentes UI](./components-ui.md): Guía de los elementos visuales de la aplicación.

---
*Desarrollado con ❤️ para mejorar los hábitos de lectura.*
