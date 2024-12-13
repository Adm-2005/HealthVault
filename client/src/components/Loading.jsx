import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = ({className = 'bg-white', textClass = 'text-primary text-xl', spinnerClass = 'text-primary h-[35px] w-[35px]'}) => {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <AiOutlineLoading3Quarters className={`${spinnerClass} animate-spin`}/>
            <p className={`font-open-sans font-semibold ${textClass}`}>Please wait...</p>
        </div>
    );
}

export default Loading;