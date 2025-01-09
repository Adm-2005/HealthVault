import { useState } from "react";
import PropTypes from "prop-types";
import { IoIosArrowDown } from "react-icons/io";

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
                <button onClick={handleArrowClick} className="bg-transparent">
                    <IoIosArrowDown
                        className={`w-[15px] h-[15px] transform transition-transform ${open ? 'rotate-180' : 'rotate-0'}`}
                    />
                </button>
            </div>
            {open && <p className="font-open-sans text-gray-700 text-md">{ans}</p>}
        </div>
    );
}

Accordion.propTypes = {
    qn: PropTypes.string.isRequired,
    ans: PropTypes.string.isRequired,
    number: PropTypes.number
}

export default Accordion;