import { IconContext } from "react-icons/lib";
import { features } from "../utils";

const Features = () => {

    return (
        <section id="features" className="flex flex-col w-full lg:w-[90vw] px-4 lg:px-[5vw] mx-auto">
            <h1 className="text-center text-2xl font-open-sans font-bold">What makes Health Vault the right choice?</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-7">
                {features.map((feature, index) => (
                    <div key={index} className="flex flex-col gap-4 items-center">
                        <IconContext.Provider value={{ size: '100px', color: '#9AA3AF'}}>
                            {feature.icon}
                        </IconContext.Provider>
                        <p className="font-open-sans font-bold text-[#9AA3AF]">{feature.text}</p>
                    </div>
                ))}               
            </div>
        </section>
    );
}

export default Features;