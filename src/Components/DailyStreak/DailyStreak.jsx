import { useContext, useState, useEffect } from "react";

const { timerComplete } = useContext(TimerContext);

const DailyStreak = () => {
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
                                    <li><p>D</p><span>check</span></li>
                                    <li><p>L</p><span>check</span></li>
                                    <li><p>M</p><span>check</span></li>
                                    <li><p>M</p><span>check</span></li>
                                    <li><p>J</p><span>check</span></li>
                                    <li><p>V</p><span>check</span></li>
                                    <li><p>S</p><span>check</span></li>
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