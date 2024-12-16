import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import hero from "../../assets/images/hero.png";

const Hero = () => {
    return (
        <section id="hero" className="flex flex-col lg:flex-row justify-between items-center w-full lg:w-[90vw] py-[40px] px-4 lg:px-[5vw] mx-auto gap-10 sm:gap-7">
           <div className="flex flex-col gap-6 max-w-xl justify-center font-open-sans">
                <p className="text-4xl lg:text-5xl text-center lg:text-left font-bold flex-nowrap leading-10">
                    Manage your records with <span className="text-primary"> Health Vault</span>
                </p>

                <p className="text-gray-700 text-justify lg:text-left">
                    Effortlessly manage and securely share health records with doctors using Health Vault.
                </p>

                <Link to="/auth" className="mx-auto lg:mx-0">
                    <Button
                        type="button"
                        text="Get Started"
                        size="large"
                        fillMethod="outline"
                        colorSet="black"
                    />
                </Link>
           </div>
            
           <img src={hero} className="w-full sm:max-w-md"></img>
        </section>
    );
}

export default Hero;