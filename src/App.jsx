import { useState } from 'react'
import DailyStreak from './Components/DailyStreak/DailyStreak'
import BookLog from './Components/BookLog/BookLog'
import ConfigBook from './Components/ConfigBook/ConfigBook'
import RegisterBook from './Components/ResgiterBook/RegisterBook'

function App() {

  const [count, setCount] = useState(0)

  return (
    <>
    {/*
      <DailyStreak />
      <BookLog />
      <ConfigBook />
      */}
      <RegisterBook />
    </>
  )
}

export default App
