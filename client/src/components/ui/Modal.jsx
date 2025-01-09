import PropTypes from "prop-types";
import { FaRegWindowClose } from "react-icons/fa";

const Modal = ({ 
    children,
    className,
    header = '',
    headerClass = ''
}) => {
    

    return (
        <div className={`${className} absolute top-1/2 flex flex-col items-center justify-between rounded-md border`}>
            <div className={`${headerClass} flex justify-between w-full px-3 py-2 border-t-md`}>
                <h1 className="font-open-sans">{header}</h1>
                <FaRegWindowClose className="" />
            </div>

            <div className="flex flex-col w-full px-3 py-2">
                {children}
            </div>
        </div>
    );
}

Modal.propTypes = {
    className: PropTypes.string,
    header: PropTypes.string,
    headerClass: PropTypes.string
}

export default Modal;