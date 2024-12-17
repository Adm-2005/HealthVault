import PropTypes from "prop-types";
import { IoMdAdd } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";

const UtilityBar = ({ omitButtons = false }) => {
    return (
        <section className="flex gap-1 justify-between items-center w-full">
            <div className="flex gap-1 items-center w-3/5 rounded-md border border-gray-600 bg-gray-100">
                <IoSearch className="relative w-[25px] h-[25px] my-2 ml-2 text-gray-600" />
                <input
                    type="text"
                    placeholder="Search"
                    className="px-3 py-2 w-full bg-gray-100 rounded-md focus:outline-none"
                ></input>
            </div>

            <div className={`${omitButtons ? 'hidden' : 'flex gap-1'}`}>
                <button
                    type="button"
                    className="flex gap-1 justify-center items-center rounded-md px-3 py-2 md:w-[120px] bg-gray-100 hover:bg-gray-200 border border-red-600"
                >
                    <FaRegTrashCan className="w-[25px] h-[25px] text-red-600" />
                    <p className="hidden md:block text-red-600 font-open-sans font-semibold">Delete</p>
                </button>

                <button
                    type="button"
                    className="flex gap-1 justify-center items-center rounded-md px-3 py-2 md:w-[120px] bg-gray-100 hover:bg-gray-200 border border-primary"
                >
                    <p className="hidden md:block text-primary font-open-sans font-semibold">Add</p>
                    <IoMdAdd className="w-[25px] h-[25px] text-primary" />
                </button>
            </div>
        </section>
    );
}

UtilityBar.propTypes = {
    omitButtons: PropTypes.bool
}

export default UtilityBar;