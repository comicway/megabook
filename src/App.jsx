import { useState } from 'react'
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
    
      {/*<DailyStreak />
      <BookLog />
      <ConfigBook />*/}
      <RegisterBook />
      {/*<ReadBook />
      <Timer />
      <ConfigHabit/>*/}
    </>
  )
}

export default App  
