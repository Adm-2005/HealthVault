import { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CgProfile, CgLogOut } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import Button from "./ui/Button";
import Loading from "./Loading";
import { encodeId } from "../utils/func";

const AccountDropdown = ({className, btnHandler}) => {
    const navigate = useNavigate();
    const {currentUser, isLoggedIn, logoutStatus} = useSelector(state => state.user);
    
    // handling dropdown events
    const [dropDownOpen, setDropDownOpen] = useState(false);
    
    const handleDropDownClick = () => {
        if(isLoggedIn) {
            setDropDownOpen(!dropDownOpen);
        } else {
            navigate("/auth");
        }
    }

    // array of objects containing options for dropdown
    const accountOptions = [
        {
            name: 'Profile',
            href: `/profile/${encodeId(currentUser.id)}`,
            icon: <CgProfile />
        },
        {
            name: 'Settings',
            href: `/profile/${encodeId(currentUser.id)}/#settings`,
            icon: <IoSettingsOutline />
        }
    ];

    return (
        <div className={`relative flex flex-col ${className}`}>
            <Button
                type="button"
                text="Account"
                size="small"
                fillMethod="fill"
                colorSet="primary"
                dropDown={true}
                dropDownState={dropDownOpen}
                onClick={handleDropDownClick}
                className=""
            />
            {dropDownOpen && (
                <ul className="absolute top-11 flex flex-col w-full bg-accent-blue border rounded-b-md divide-y">
                    {accountOptions.map((option, index) => (
                        <li
                            key={index}
                            className="font-open-sans font-semibold text-md text-white hover:text-primary hover:bg-white p-2"
                        >
                            <Link
                                to={option.href}
                                className="flex gap-2 items-center cursor-pointer"
                            >
                                {option.icon}
                                {option.name}
                            </Link>
                        </li>
                    ))}
                    <button
                        type="button"
                        className="flex gap-2 items-center cursor-pointer font-open-sans font-semibold text-md text-white hover:text-primary hover:bg-white p-2"
                        onClick={btnHandler}
                    >
                        {logoutStatus === 'loading' ? (
                            <Loading 
                                textClass="font-semibold font-open-sans text-primary"
                                spinnerClass="text-primary"
                                text="Working..." 
                            />
                        ) : (
                            <div className="flex gap-2 items-center w-full">
                                <CgLogOut />
                                Logout
                            </div>
                        )}
                    </button>
                </ul>
            )}
        </div>
    );
}

AccountDropdown.propTypes = {
    className: PropTypes.string,
    btnHandler: PropTypes.func
};

export default AccountDropdown;