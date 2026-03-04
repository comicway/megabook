import { Link } from "react-router-dom";

const ConfigBook = () => {
    return (
        <>
            <div className="container mx-auto px-2 mt-[20px]">
                <div className="grid grid-cols-1">
                    <div>
                        <Link to="/readbook">
                            <button className="w-[100%]">Leer</button>
                        </Link>
                    </div>
                    <div>
                        <Link to="/confighabit">
                            <button className="w-[100%] mt-[10px]">Configrurar</button>
                        </Link>

                    </div>
                </div>
            </div>
        </>
    );
}

export default ConfigBook;