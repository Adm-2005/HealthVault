import PropTypes from "prop-types";
import { MdOutlineArrowDropDown } from "react-icons/md";

const Button = ({ 
    text, 
    type = 'button', 
    rounded = 'md',
    size = 'normal', 
    fillMethod = 'fill', 
    colorSet = 'primary', 
    shadow = 'none',
    className = '',
    dropDown = false, 
    dropDownState,
    onClick
}) => {

    const sizeClasses = {
        small: 'px-5 py-1 text-md',
        normal: 'px-6 py-2 text-lg',
        large: 'px-12 py-3 text-xl'
    }

    const bgClasses = {
        fill: {
            white: 'bg-white hover:bg-slate-200 text-transparent',
            black: 'bg-gray-700 hover:bg-gray-900 text-white',
            primary: 'bg-primary hover:bg-primary-dark text-white',
            primarydark: 'bg-primary-dark hover:bg-primary text-white',
            secondary: 'bg-secondary hover:bg-accent-green text-white',
            accentblue: 'bg-accentblue hover:bg-primary text-white',
            accentgreen: 'bg-accentgreen hover:bg-secondary text-white'
        },
        outline: {
            white: 'bg-transparent border border-white text-white hover:bg-white hover:text-black',
            black: 'bg-transparent border border-black text-black hover:bg-black hover:text-white',
            primary: 'bg-transparent border border-primary text-primary hover:bg-primary hover:text-white',
            primarydark: 'bg-transparent border border-primary-dark text-primary-dark hover:bg-primary-dark hover:text-white',
            secondary: 'bg-transparent border border-secondary text-secondary hover:bg-secondary hover:text-white',
            accentblue: 'bg-transparent border border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-white',
            accentgreen: 'bg-transparent border border-accent-green text-accent-green hover:bg-accent-green hover:text-white'
        }
    }
    
    const shapeClasses = {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full'
    }

    const shadowClasses = {
        none: '',
        sm: 'shadow-sm',
        md: 'shadow-md',
        lg: 'shadow-lg',
        xl: 'shadow-xl',
    }

    const bgClass = fillMethod === 'fill' ? bgClasses.fill[colorSet] : bgClasses.outline[colorSet];
    const sizeClass = sizeClasses[size];
    const shapeClass = shapeClasses[rounded];
    const shadowClass = shadowClasses[shadow];

    return (
        <button
            type={type}
            onClick={onClick}
            className={`flex justify-center items-center gap-1 font-open-sans font-semibold ${className} ${shapeClass} ${sizeClass} ${bgClass} ${shadowClass} shadow-black transition-colors duration-300`}
        >
            {text}
            {dropDown && (
                <MdOutlineArrowDropDown className={`w-[35px] h-[35px] text-white transform transition-transform ${dropDownState ? 'rotate-180' : 'rotate-0'}`} />
            )}
        </button>
    );
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    rounded: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl', 'full']),
    size: PropTypes.oneOf(['small', 'normal', 'large']),
    fillMethod: PropTypes.oneOf(['fill', 'outline']),
    colorSet: PropTypes.oneOf(['black', 'primary', 'primarydark', 'secondary', 'accentblue', 'accentgreen']),
    shadow: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl']),
    dropDown: PropTypes.bool,
    dropDownState: PropTypes.bool,
    onClick: PropTypes.func
};

export default Button;