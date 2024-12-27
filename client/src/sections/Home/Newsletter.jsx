import { useState, useEffect } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Loading from "../../components/Loading";

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleSubscription = async () => {
        if(email.length === 0) {
            setErrorMessage('Please enter an email address.');
        }
        
        setIsLoading(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/newsletter`, {
                method: 'POST',
                credentials: 'include'
            });

            if(response.ok) {
                setIsSubscribed(true);
            } else {
                setError(true);
            }

        } catch(error) {
            setError(true);
            setErrorMessage('Some error occurred.');
            console.log(`Error while subscribing to newsletter: ${error}`);
        }

        setIsLoading(false);
    }

    return (
        <section id="newsletter" className="flex flex-col relative w-full h-[50vh] md:h-[45vh] bg-primary">
            <div className="left-up-triangle absolute top-0 w-full h-[80px] bg-white"></div>

            <div className="relative flex flex-col gap-6 justify-center z-10 top-[70px] w-full lg:w-[90vw] px-4 lg:px-[5vw] mx-auto text-white font-open-sans">
                <h1 className="text-2xl font-bold">Stay Updated</h1>
                <div className="flex flex-col md:flex-row gap-3 font-open-sans">
                    <p className="">
                        Stay updated with the latest in health record management and technology by subscribing to our newsletter.
                    </p>

                    {isLoading && <Loading className="bg-white p-3 rounded-md w-full md:max-w-md" textClass="text-accent-green" spinnerClass="text-accent-green h-[30px] w-[30px]" text="Subscribing..." />}
                    
                    {(isSubscribed)
                        ? (
                            <div className="flex items-center gap-2 p-3 bg-white rounded-md w-full lg:max-w-md">
                                <AiOutlineCheckCircle className="h-[30px] w-[30px] text-accent-green"/>
                                <p className="text-primary">Thanks for subscribing to our newsletter.</p>
                            </div>
                        )
                        : (
                            !isLoading && (<div className="relative z-10 flex flex-col gap-1 w-full h-full lg:max-w-md">
                                <input 
                                    type="text"
                                    value={email}
                                    onChange={handleEmailChange} 
                                    placeholder={`${error ? errorMessage : 'Email'}`} 
                                    className={`w-full bg-transparent ${error ? 'text-red-800 border-red-800 placeholder:text-red-800' : 'text-white border-white placeholder:text-white'} border-2 focus:outline-none p-3 rounded-full`}
                                ></input>
                                <button 
                                    type="button" 
                                    onClick={handleSubscription}
                                    className={`absolute right-0 ${error ? 'bg-red-800' : 'bg-white hover:bg-slate-200'} h-full rounded-full text-primary py-3 px-6 transition-colors duration-300 font-open-sans font-semibold`}
                                >
                                    Subscribe
                                </button>
                            </div>)
                        )
                    }
                
                </div>
            </div>

            <div className="right-down-triangle absolute bottom-0 w-full h-[80px] bg-white"></div>
        </section>
    );
}

export default Newsletter;