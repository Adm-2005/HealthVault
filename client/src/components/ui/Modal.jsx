import { FaRegWindowClose } from "react-icons/fa";

const Modal = ({ 
    children,
    className,
    header = '',
    colorSet = 'primary'
}) => {
    const colorClasses = {
        primary: 'bg-primary text-white',
        primarydark: 'bg-primary-dark text-white',
        secondary: 'bg-secondary text-white',
        accentgreen: 'bg-accent-green text-white',
        accentblue: 'bg-accent-blue text-white',
        black: 'bg-black text-white'
    }

    const colorClass = colorClasses[colorSet];

    return (
        <div className={`${className} absolute top-1/2 flex flex-col items-center justify-between rounded-md border`}>
            <div className={`${colorClass} flex justify-between w-full px-3 py-2 border-t-md`}>
                <h1 className="font-open-sans">{header}</h1>
                <FaRegWindowClose className="text-white" />
            </div>

            <div className="flex flex-col w-full px-3 py-2">
                {children}
            </div>
        </div>
    );
}

export default Modal;