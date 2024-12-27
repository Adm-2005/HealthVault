import PropTypes from "prop-types";
import { IoLocationSharp, IoMedkitOutline } from "react-icons/io5";
import { FaRegHospital, FaRegIdCard } from "react-icons/fa";
import { GoPencil } from "react-icons/go";

const Bio = ({ user, doctor, handleEditClick }) => {
    return (
        <section id="bio" className="w-full lg:w-[90vw] px-4 lg:px-[5vw] mx-auto font-open-sans">
            <div className="relative flex flex-col gap-3 p-2 md:p-4 border rounded-lg text-center md:text-left">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <img
                        alt={user.first_name.charAt(0) + user.last_name.charAt(0)} 
                        src={''} 
                        className="w-[200px] h-[200px] object-cover rounded-full border mx-auto md:mx-0"
                    >

                    </img>
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl lg:text-3xl text-primary-dark font-bold ml-1">
                            {user.first_name + " " + user.last_name}
                        </h1>
                        
                        <h3 className="text-xl text-accent-green hover:text-green-700 cursor-pointer ml-1">
                            @{user.username}
                        </h3>
                        
                        <div className="flex gap-1 items-center">
                            <IoLocationSharp className="text-red-600 h-[25px] w-[25px]" />
                            <p className="text-gray-600 text-lg">{user.city}, {user.state}, {user.country}</p>
                        </div>
                        
                        {user.role === 'doctor' && (
                            <div>
                                {doctor.affiliation && (
                                    <div className="flex gap-1 items-center">
                                        <FaRegHospital className="text-pink-500 h-[25px] w-[25px]" />
                                        <p className="text-gray-600 text-lg">{doctor.affiliation}</p>
                                    </div>
                                )}

                                {doctor.license_number && (
                                    <div className="flex gap-1 items-center">
                                        <FaRegIdCard className="text-primary-dark h-[25px] w-[25px]" />
                                        <p className="text-gray-600 text-lg">{doctor.license_number}</p>
                                    </div>
                                )}
                                
                                {doctor.specialization && (
                                    <div className="flex gap-1 items-center">
                                        <IoMedkitOutline className="text-accent-green h-[25px] w-[25px]" />
                                        <p className="text-gray-600 text-lg">{doctor.specialization}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                
                {user.bio && (
                    <p className="text-gray-600">
                        {user.bio}
                    </p>
                )}

                <GoPencil 
                    onClick={() => handleEditClick(user.id)}
                    className="absolute right-3 top-2 w-[25px] h-[25px] text-primary" 
                />
            </div>

        </section>
    );
}

Bio.propTypes = {
    user: PropTypes.object.isRequired,
    doctor: PropTypes.object,
    handleEditClick: PropTypes.func
}

export default Bio;