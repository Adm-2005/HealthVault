import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./ui/Button";
import { accountOptions } from "../utils";

const AccountDropdown = ({className}) => {
    const [dropDownOpen, setDropDownOpen] = useState(false);

    const handleDropDownClick = () => {
        setDropDownOpen(!dropDownOpen);
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
                        {option.href
                            ? (
                                <Link
                                    to={option.href}
                                    className="flex gap-2 items-center cursor-pointer"
                                >
                                    {option.icon}
                                    {option.name}
                                </Link>
                            )
                            : (
                                <span
                                    onClick={option.onClick}
                                    className="flex gap-2 items-center cursor-pointer"
                                >
                                    {option.icon}
                                    {option.name}
                                </span>
                            )
                        }
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default AccountDropdown;