import { Link } from "react-router-dom";
import { BiErrorCircle } from "react-icons/bi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/ui/Button";

const Error = () => {

    return (
        <div className="flex flex-col min-h-screen w-full items-center justify-between">
            <Navbar />

            <section className="relative w-full">
                <div className="absolute top-0 left-up-triangle bg-white w-full h-[100px]"></div>

                <div className="bg-secondary h-[80vh]">
                    <div className="relative top-[44px] z-10 flex flex-col items-center gap-3 w-full lg:w-[90vw] px-4 lg:px-[5vw] py-6 mx-auto">
                        <BiErrorCircle className="w-[300px] h-[300px] text-red-600"/>
                        <p className="font-open-sans font-bold text-xl lg:text-2xl text-red-600">Uh-Oh! Something went wrong.</p>
                        <Link to="/">
                            <Button
                                type="button"
                                text="Go to Home Page"
                            />
                        </Link>
                    </div>
                </div>

                <div className="absolute bottom-0 right-down-triangle bg-white w-full h-[100px]"></div>
            </section>

            <Footer />
        </div>
    );
}

export default Error;