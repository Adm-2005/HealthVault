import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import PropTypes from "prop-types"

const SelectInput = ({
    options = [],
    color = 'primary',
    onChange,
    label = '',
    placeholder = '-- Select an option --'
}) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState('');

    const colorClasses = {
        primary: {
            label: 'text-primary',
            input: 'text-primary placeholder:text-primary/50 ring-primary',
            arrow: 'text-primary',
            options: 'hover:bg-primary hover:text-white active:bg-primary active:text-white'
        },
        primarydark: {
            label: 'text-primary-dark',
            input: 'text-primary-dark placeholder:text-primary-dark/50 ring-primary-dark',
            arrow: 'text-primary-dark',
            options: 'hover:bg-primary-dark hover:text-white active:bg-primary-dark active:text-white'
        },
        accentgreen: {
            label: 'text-accent-green',
            input: 'text-accent-green placeholder:text-accent-green/50 ring-accent-green',
            arrow: 'text-accent-green',
            options: 'hover:bg-accent-green hover:text-white active:bg-accent-green active:text-white'
        }
    }

    const toggleDropDown = () => { setOpen(!open) };
    const handleOptionChange = (option) => {
        setSelected(option);
        onChange(option);
        setOpen(false);
    };

    const inputClass = colorClasses[color].input || 'text-gray-700 placeholder:text-gray-700/50 ring-text-gray-700';
    const labelClass = colorClasses[color].label || 'text-gray-700';
    const arrowClass = colorClasses[color].arrow || 'text-gray-700';
    const optionClass = colorClasses[color].options || 'hover:text-gray-700 hover:text-white active:text-gray-700 active:text-white';

    return (
        <div className="relative w-full">
            {label && <label className={`mb-1 font-medium font-open-sans ${labelClass}`}>{label}</label>}

            <div
                onClick={toggleDropDown}
                className={`flex justify-between items-center w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 cursor-pointer ${inputClass}`}
            >
                <span>{selected || placeholder}</span>
                <IoIosArrowDown className={`${arrowClass} w-[25px] h-[25px] transform transition-transform ${open ? 'rotate-180' : 'rotate-0'}`} />
            </div>

            {open && (
                <ul className={`absolute z-10 mt-1 w-full max-h-60 overflow-y-auto bg-white divide-y ${labelClass} font-open-sans rounded-md shadow-lg`}>
                    {options.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => handleOptionChange(option)}
                            className={`px-3 py-2 cursor-pointer ${optionClass}`}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

SelectInput.propTypes = {
    options: PropTypes.array.isRequired,
    color: PropTypes.oneOf(['primary', 'primarydark', 'accentgreen']),
    onChange: PropTypes.func.isRequired,
    labeL: PropTypes.string,
    placeholder: PropTypes.string
}

export default SelectInput;