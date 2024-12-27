import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SignUp from "../sections/Auth/SignUp";
import SignIn from "../sections/Auth/SignIn";

const Auth = () => {
    const [selectedSection, setSelectedSection] = useState('Sign Up');

    const handleSectionButtonClick = (section) => {
        if(section !== 'Sign Up' && section !== 'Sign In') {
            throw new Error('Invalid section value.');
        }
        else {
            setSelectedSection(section);
        }
    }

    return (
        <div className="flex flex-col min-h-screen justify-between">
            <Navbar />

            <div className="flex flex-col w-full md:w-[448px] px-4 py-[30px] mx-auto">
                <div className="flex w-full">
                    <button
                        className={`${selectedSection === 'Sign Up' ? 'bg-white text-primary font-bold border border-b-0' : 'bg-slate-100 text-gray-800'} w-1/2 p-4 rounded-t-md font-open-sans`}
                        onClick={() => handleSectionButtonClick('Sign Up')}
                    >
                        Sign Up
                    </button>
                    <button
                        className={`${selectedSection === 'Sign In' ? 'bg-white text-primary font-bold border border-b-0' : 'bg-slate-100 text-gray-800'} w-1/2 p-4 rounded-t-md font-open-sans`}
                        onClick={() => handleSectionButtonClick('Sign In')}
                    >
                        Sign In
                    </button>
                </div>

                {selectedSection === 'Sign Up' ? <SignUp /> : <SignIn />}
            </div>

            <Footer />
        </div>
    );
}

export default Auth;