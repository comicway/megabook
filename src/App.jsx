import { useState } from 'react'
import DailyStreak from './Components/DailyStreak/DailyStreak'

function App() {

  const [count, setCount] = useState(0)

  return (
    <>
    <DailyStreak />
      <h1 className="text-4xl font-bold underline">
      Hello world!
      </h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
