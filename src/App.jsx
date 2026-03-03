import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TimerProvider } from './Components/Context/TimerProvider'
import ConfigBook from './Components/ConfigBook/ConfigBook'
import RegisterBook from './Components/ResgiterBook/RegisterBook'
import ReadBook from './Components/ReadBook/ReadBook'
import Timer from './Components/Timer/Timer'
import ConfigHabit from './Components/ConfigHabit/ConfigHabit'
import HomePage from './Components/Home/Home'

function App() {

  return (
    <>
      <TimerProvider>
        <HomePage />
        {/*<ConfigBook />
        <RegisterBook />
      <ReadBook />
      <ConfigHabit/>
      */}
        <Timer />
      </TimerProvider>
    </>
  )
}

export default App  
