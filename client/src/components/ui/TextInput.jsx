import { useState } from "react";
import PropTypes from "prop-types";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const TextInput = ({ 
    type = 'text',
    color = 'primary', 
    name = '',
    value, 
    onChange, 
    label = '', 
    placeholder = '', 
    password = false,
    ...rest
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = (event) => {
        event.preventDefault();
        setShowPassword(!showPassword);
    }

    const colorClasses = {
        primary: {
            label: 'text-primary',
            input: 'text-primary placeholder:text-primary/50 ring-primary',
            widget: 'text-primary'
        },
        primarydark: {
            label: 'text-primary-dark',
            input: 'text-primary-dark placeholder:text-primary-dark/50 ring-primary-dark',
            widget: 'text-primary-dark'
        },
        accentgreen: {
            label: 'text-accent-green',
            input: 'text-accent-green placeholder:text-accent-green/50 ring-accent-green',
            widget: 'text-accent-green'
        }
    }

    const labelColorClass = colorClasses[color].label || '';
    const inputColorClass = colorClasses[color].input || '';
    const widgetColorClass = colorClasses[color].widget || '';
    const sanitizedLabel = label?.toLowerCase().replace(/[^a-z0-9]/g, '') || ''

    return (
        <div className="relative">
            {label && (
                <label 
                    htmlFor={sanitizedLabel}
                    className={`${labelColorClass} mb-1 font-medium font-open-sans`}
                >
                  {label}
                </label>
            )}
            <input
                type={password ? (showPassword ? 'text' : 'password') : type}
                value={value}
                onChange={onChange}
                id={sanitizedLabel}
                name={name}
                placeholder={placeholder}
                className={`${inputColorClass} w-full px-3 py-2 font-open-sans border rounded-md focus:outline-none focus:ring-2`}
                {...rest}
            />
            
            {password && (
                <button 
                    type="button" 
                    className="absolute right-1 bottom-2"
                    aria-label={showPassword ? "Hide Password" : "Show Password"}
                >
                    {showPassword 
                        ? <AiOutlineEyeInvisible 
                            onClick={toggleShowPassword} 
                            className={`${widgetColorClass} w-[25px] h-[25px]`} 
                          /> 
                        : <AiOutlineEye 
                            onClick={toggleShowPassword} 
                            className={`${widgetColorClass} w-[25px] h-[25px]`} 
                          />}
                </button>
            )}
        </div>
    );
}

TextInput.propTypes = {
    type: PropTypes.string,
    color: PropTypes.oneOf(['primary', 'primarydark', 'accentgreen']),
    name: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    password: PropTypes.bool
}

export default TextInput;