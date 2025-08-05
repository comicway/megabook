const BookLog = () => {
    return (
        <>
            <div className="container mx-auto px-2 mt-[8px]">
                <div className="grid gap-3">
                    <div className="grid-cols-2">
                        <div>
                            <p>Libros</p>
                        </div>
                        <div>
                            <button>Cargar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookLog;