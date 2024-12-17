import { IoLocationSharp, IoMedkitOutline } from "react-icons/io5";
import { FaRegHospital, FaRegIdCard } from "react-icons/fa";
import { GoPencil } from "react-icons/go";

const Bio = () => {

    return (
        <section id="bio" className="w-full lg:w-[90vw] px-4 lg:px-[5vw] mx-auto font-open-sans">
            <div className="relative flex flex-col gap-3 p-2 md:p-4 border rounded-lg text-center md:text-left">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <img src={''} className="w-[200px] h-[200px] object-cover rounded-full border mx-auto md:mx-0"></img>
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl lg:text-3xl text-primary-dark font-bold ml-1">{/* Full Name */}</h1>
                        
                        <h3 className="text-xl text-accent-green hover:text-green-700 cursor-pointer ml-1">{/* Username */}</h3>
                        
                        <div className="flex gap-1 items-center">
                            <IoLocationSharp className="text-red-600 h-[25px] w-[25px]" />
                            <p className="text-gray-600 text-lg">{/* Location */}</p>
                        </div>
                        
                        <div className="flex gap-1 items-center">
                            <FaRegHospital className="text-pink-500 h-[25px] w-[25px]" />
                            <p className="text-gray-600 text-lg">{/* Doctor's affiliated organization */}</p>
                        </div>

                        <div className="flex gap-1 items-center">
                            <FaRegIdCard className="text-primary-dark h-[25px] w-[25px]" />
                            <p className="text-gray-600 text-lg">{/* Doctor's License Number */}</p>
                        </div>

                        <div className="flex gap-1 items-center">
                            <IoMedkitOutline className="text-accent-green h-[25px] w-[25px]" />
                            <p className="text-gray-600 text-lg">{/* Doctor's Specialization */}</p>
                        </div>
                    </div>
                </div>
                <p className="text-gray-600">
                    {/* Bio Text */}
                </p>

                <GoPencil className="absolute right-3 top-2 w-[25px] h-[25px] text-primary" />
            </div>

        </section>
    );
}

export default Bio;