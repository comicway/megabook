const BookLog = () => {
    return (
        <>
            <div className="container mx-auto px-2 mt-[8px]">
                    <div className="flex justify-between items-center">
                        <div>
                            <p>Libros</p>
                        </div>
                        <div>
                            <button>Cargar</button>
                        </div>
                    </div>
            </div>
            <div className="container mx-auto px-2 mt-[8px]">
                <div className="">
                    <div className="grid gap-3 grid-cols-3 lg:grid-cols-4">
                        <div className="book-card">
                            <img src="https://images-na.ssl-images-amazon.com/images/I/51N-u8AsmdL._SX329_BO1,204,203,200_.jpg" alt="Portada del libro" className=""/>
                        </div>
                        <div className="book-card">
                            <img src="https://images-na.ssl-images-amazon.com/images/I/51N-u8AsmdL._SX329_BO1,204,203,200_.jpg" alt="Portada del libro" className=""/>
                        </div>
                        <div className="book-card">
                            <img src="https://images-na.ssl-images-amazon.com/images/I/51N-u8AsmdL._SX329_BO1,204,203,200_.jpg" alt="Portada del libro" className=""/>
                        </div>
                        <div className="book-card">
                            <img src="https://images-na.ssl-images-amazon.com/images/I/51N-u8AsmdL._SX329_BO1,204,203,200_.jpg" alt="Portada del libro" className=""/>
                        </div>
                        <div className="book-card">
                            <img src="https://images-na.ssl-images-amazon.com/images/I/51N-u8AsmdL._SX329_BO1,204,203,200_.jpg" alt="Portada del libro" className=""/>
                        </div>
                        <div className="book-card">
                            <img src="https://images-na.ssl-images-amazon.com/images/I/51N-u8AsmdL._SX329_BO1,204,203,200_.jpg" alt="Portada del libro" className=""/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookLog;