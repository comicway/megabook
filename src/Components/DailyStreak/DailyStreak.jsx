const DailyStreak = () => {
  return (
    <>
        <div className="container mx-auto">
            <div className="grid gap-3">
                <div className="grid-cols-1">
                    <div>
                        <p>3</p>
                        <p>Dias</p>
                    </div>
                    <div>
                        <ul>
                            <li><p>D</p><span>check</span></li>
                            <li><p>L</p><span>check</span></li>
                            <li><p>M</p><span>check</span></li>
                            <li><p>M</p><span>check</span></li>
                            <li><p>J</p><span>check</span></li>
                            <li><p>V</p><span>check</span></li>
                            <li><p>S</p><span>check</span></li>
                        </ul>
                        <p>SEMANAS</p>
                    </div>
                </div>
             </div>
        </div>
    </>
  );
}

export default DailyStreak;