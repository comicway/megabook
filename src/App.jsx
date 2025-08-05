import { useState } from 'react'
import DailyStreak from './Components/DailyStreak/DailyStreak'
import BookLog from './Components/BookLog/BookLog'
function App() {

  const [count, setCount] = useState(0)

  return (
    <>
      <DailyStreak />
      <BookLog />
    </>
  )
}

export default App
