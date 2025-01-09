import PropTypes from "prop-types";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = ({
    className = '', 
    textClass = 'text-primary text-xl', 
    spinnerClass = 'text-primary h-[35px] w-[35px]', 
    text = 'Loading...'
}) => {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <AiOutlineLoading3Quarters className={`${spinnerClass} animate-spin`}/>
            <p className={`font-open-sans font-semibold ${textClass}`}>{text}</p>
        </div>
    );
}

Loading.propTypes = {
    className: PropTypes.string,
    textClass: PropTypes.string,
    spinnerClass: PropTypes.string,
    text: PropTypes.string
}

export default Loading;