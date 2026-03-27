import { Link } from "react-router-dom";

const ToolBar = () => {
    return (
        <>
            <div className="fixed bottom-0 w-full shadow-toolbar">
                <div className="container-fluid mx-auto">
                    <div className="grid grid-cols-3 bg-primary h-[74px]">
                        <Link to="/">
                            <button className=" text-white-b font-nsbold font-extrabold text-xs text-center flex flex-col justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 -960 960 960"
                                    className="h-[26px] w-[29px] fill-white-b"
                                >
                                    <path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" />
                                </svg>
                                <span>Home</span>
                            </button>
                        </Link>
                        <Link to="/confighabit">
                            <button className="w-[100%] mt-[10px]">Configrurar</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ToolBar;