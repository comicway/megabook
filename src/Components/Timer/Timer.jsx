const Timer = () => {
    return (
        <>
            <div className="container mx-auto px-2 mt-[20px]">
                <div className="grid grid-cols-1 text-center">
                    <p className="text-[54px]">08:08</p>
                </div>
                <div className="grid grid-cols-2">
                    <button className="w-[98%]">STOP</button>
                    <button className="w-[98%]">PAUSA</button>
                </div>
            </div>
        </>
    );
}

export default Timer