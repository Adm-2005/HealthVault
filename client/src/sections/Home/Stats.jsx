import { IconContext } from "react-icons/lib";
import { stats } from "../../utils";

const Stats = () => {
    return (
        <section id="about" className="flex flex-col gap-5 w-full lg:w-[90vw] px-4 lg:px-[5vw] py-[70px] mx-auto">
            <div className="flex flex-col gap-5 font-open-sans">
                <h1 className="text-2xl font-bold">Need for Digitized Health Records</h1>
                <p className="text-md text-gray-800 font-open-sans">
                    Discover why digitized health records are essential: key statistics highlighting the growing healthcare digitalization trend.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
                {stats.map((stat, index) => (
                    <div key={index} className="flex flex-col gap-3 items-center justify-center w-full h-[200px] rounded-md border font-open-sans shadow-lg p-4">
                        <IconContext.Provider value={{ size: '35px', color: '#61E09E' }}>
                            {stat.icon}
                        </IconContext.Provider>

                        <div className="flex flex-col gap-2 max-w-md">
                            <h3 className="text-2xl text-center font-bold">{stat.stat}</h3>
                            <p className="text-gray-800 text-center">{stat.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Stats;