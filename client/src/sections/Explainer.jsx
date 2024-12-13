import { useState } from "react";
import { FiPlayCircle } from "react-icons/fi";
import { FiPauseCircle } from "react-icons/fi";

const Explainer = () => {
    const [play, setPlay] = useState(false);

    const handlePlayBtnClick = () => {
        setPlay(!play);
    }

    return (
        <section id="explainer" className="flex flex-col relative w-full h-[80vh] bg-secondary">
            {/* White Triangle with Left Top */}
            <div className="left-up-triangle absolute top-0 w-full h-[80px] sm:h-[100px] bg-white"></div>

            {/* Content Container */}
            <div className="relative top-[80px] z-10 flex flex-col gap-9 w-full lg:w-[90vw] px-4 lg:px-[5vw] mx-auto">
                {/* Text Container */}
                <div className="flex flex-col gap-5 font-open-sans max-w-lg">
                    <h1 className="text-2xl font-bold">Solving the Puzzle</h1>
                    <p className="text-gray-800 text-md">
                        Learn how HealthVault simplifies secure medical record management and sharing through this quick explainer video.
                    </p>
                </div>

                {/* Video */}
                <div className="relative w-full h-[300px] md:max-w-2xl sm:h-[50vh] mx-auto bg-gray-900 rounded-lg flex items-center justify-center">
                    <video src="" className="w-full h-full object-cover rounded-lg">
                        <source src=""></source>
                    </video>

                    {/* Play Button */}
                    <div className="absolute w-[50px] h-[50px] rounded-full bg-primary-dark flex items-center justify-center">
                        {play 
                            ? <FiPauseCircle 
                                className="w-[30px] h-[30px] text-white" 
                                onClick={handlePlayBtnClick} 
                              /> 
                            : <FiPlayCircle 
                                className="w-[30px] h-[30px] text-white" 
                                onClick={handlePlayBtnClick} 
                              />
                        }
                    </div>
                </div>

            </div>

            {/* White Triangle with Right Down */}
            <div className="right-down-triangle absolute bottom-0 w-full h-[80px] sm:h-[100px] bg-white"></div>
        </section>
    );
}

export default Explainer;