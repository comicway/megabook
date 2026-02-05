import { useContext } from "react";
import { TimerContext } from '../Context/TimerProvider';


const DailyStreak = () => {

    const { timerComplete, domingo, lunes, martes, miercoles, jueves, viernes, sabado } = useContext(TimerContext);

    return (
        <>
            <div className="container mx-auto px-2 mt-[8px]">
                <div className="grid gap-3">
                    <div className="grid-cols-1">
                        <div className="cardStreak">
                            <div className="w-1/5">
                                <p>{timerComplete}</p>
                                <p>Dias</p>
                            </div>
                            <div className="w-4/5">
                                <ul className="streak-list">
                                    <li><span>{domingo ? "check" : ""}</span><p>D</p></li>
                                    <li><span>{lunes ? "check" : ""}</span><p>L</p></li>
                                    <li><span>{martes ? "check" : ""}</span><p>M</p></li>
                                    <li><span>{miercoles ? "check" : ""}</span><p>M</p></li>
                                    <li><span>{jueves ? "check" : ""}</span><p>J</p></li>
                                    <li><span>{viernes ? "check" : ""}</span><p>V</p></li>
                                    <li><span>{sabado ? "check" : ""}</span><p>S</p></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DailyStreak;