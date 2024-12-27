import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CgProfile, CgLogOut } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import Button from "./ui/Button";

const AccountDropdown = ({className, btnHandler}) => {
    const navigate = useNavigate();
    const {currentUser, isLoggedIn} = useSelector(state => state.user);
    const [dropDownOpen, setDropDownOpen] = useState(false);

    const accountOptions = [
        {
            name: 'Profile',
            href: `/profile/${currentUser.id}`,
            icon: <CgProfile />
        },
        {
            name: 'Settings',
            href: `/profile/${currentUser.id}/settings`,
            icon: <IoSettingsOutline />
        }
    ]

    const handleDropDownClick = () => {
        if(isLoggedIn) {
            setDropDownOpen(!dropDownOpen);
        } else {
            navigate("/auth");
        }
    }

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
                    <li className="font-open-sans font-semibold text-md text-white hover:text-primary hover:bg-white p-2">
                        <button
                            type="button"
                            className="flex gap-2 items-center cursor-pointer"
                            onClick={btnHandler}
                        >
                            <CgLogOut />
                            Logout
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
}

export default AccountDropdown;