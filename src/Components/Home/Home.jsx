import { TimerProvider } from '../Context/TimerProvider'
import DailyStreak from '../DailyStreak/DailyStreak'
import BookLog from '../BookLog/BookLog'

const HomePage = () => {
    return (
        <>
            <TimerProvider>
                <DailyStreak />
                <BookLog />
            </TimerProvider>
        </>
    )
}

export default HomePage