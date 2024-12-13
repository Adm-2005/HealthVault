import { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const Accordion = ({qn, ans, number}) => {
    const [open, setOpen] = useState(false);
    
    const handleArrowClick = () => {
        setOpen(!open);
    }

    return (
        <div className="flex flex-col gap-2 p-3 border-b w-full">
            <div className="flex justify-between gap-1">
                <div className="flex gap-2 items-center">
                    <p className="font-open-sans font-bold text-primary">{'0' + String(number)}</p>
                    <p className="font-open-sans font-bold text-md">{qn}</p>
                </div>
                <button>
                    {open
                        ? <IoIosArrowUp onClick={handleArrowClick} className="w-[15px] h-[15px]"/>
                        : <IoIosArrowDown onClick={handleArrowClick} className="w-[15px] h-[15px]"/>
                    }
                </button>
            </div>
            {open && <p className="font-open-sans text-gray-700 text-md">{ans}</p>}
        </div>
    );
}

export default Accordion;