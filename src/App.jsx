import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TimerProvider } from './Components/Context/TimerProvider'
import RegisterBook from './Components/ResgiterBook/RegisterBook'
import ReadBook from './Components/ReadBook/ReadBook'
import Timer from './Components/Timer/Timer'
import ConfigHabit from './Components/ConfigHabit/ConfigHabit'
import HomePage from './Components/Home/Home'

function App() {

  return (
    <>
      <TimerProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/readbook' element={<ReadBook />} />
            <Route path='/confighabit' element={<ConfigHabit />} />
            <Route path='/registerbook' element={<RegisterBook />} />
            <Route path='/timer' element={<Timer />} />
          </Routes>
        </BrowserRouter>
      </TimerProvider>
    </>
  )
}

export default App  