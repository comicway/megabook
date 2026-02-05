import { useState } from 'react'
import { TimerProvider } from './Components/Context/TimerProvider'
import DailyStreak from './Components/DailyStreak/DailyStreak'
import BookLog from './Components/BookLog/BookLog'
import ConfigBook from './Components/ConfigBook/ConfigBook'
import RegisterBook from './Components/ResgiterBook/RegisterBook'
import ReadBook from './Components/ReadBook/ReadBook'
import Timer from './Components/Timer/Timer'
import ConfigHabit from './Components/ConfigHabit/ConfigHabit'

function App() {

  const [count, setCount] = useState(0)

  return (
    <>
      <TimerProvider>
        <DailyStreak />
        <BookLog />
        <ConfigBook />
        {/*<RegisterBook />
      <ReadBook />
      <ConfigHabit/>
      */}
        <Timer />
      </TimerProvider>
    </>
  )
}

export default App  
