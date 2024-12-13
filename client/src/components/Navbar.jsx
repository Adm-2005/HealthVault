import { useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import Button from "./ui/Button";
import logo from "../assets/images/logo.png";
import { navLinks } from "../utils";

const Navbar = () => {
    const [navOpen, setNavOpen] = useState(false);

    const handleNavClick = () => {
        setNavOpen(!navOpen);
    }

    return (
        <nav className="flex p-4 lg:px-[5vw] w-full lg:w-[90vw] mx-auto items-center justify-between">
            <Link to="/" className="flex gap-1 items-center">
                <h1 className="font-open-sans font-bold text-primary-dark text-2xl">Health</h1>
                <img src={logo} className="h-[30px] w-auto"></img>
                <h1 className="font-open-sans font-bold text-primary-dark text-2xl">Vault</h1>
            </Link>

            {navOpen 
                ? (
                    <ul className="flex flex-col gap-5 bg-white w-full p-5 absolute top-[63px]">
                        <li>
                            <Button 
                                type="button"
                                text="Account"
                                rounded="md"
                                size="small"
                                fillMethod="fill"
                                colorSet="primary"
                                dropDown={true}
                                className=""
                            />
                        </li>
                        {navLinks.map((navLink, index) => (
                            <NavLink
                                key={index} 
                                to={navLink.href} 
                                className={({ isActive, isPending }) => {
                                    isPending ? '' : isActive ? 'text-accent-green' : 'text-gray-800'
                                }}
                            >
                                <li className="text-lg font-open-sans font-medium">{navLink.name}</li>
                            </NavLink>
                        ))}
                    </ul>
                )
                : (
                    <ul className="hidden lg:flex gap-9">
                        {navLinks.map((navLink, index) => (
                            <NavLink 
                                key={index}
                                to={navLink.href} 
                                className={({ isActive, isPending }) => {
                                    isPending ? '' : isActive ? '' : ''
                                }}
                            >
                                <li className="text-md font-open-sans font-semibold">{navLink.name}</li>
                            </NavLink>
                        ))}
                    </ul>
                )
            }

            <Button 
                type="button"
                text="Account"
                size="small"
                fillMethod="fill"
                colorSet="primary"
                dropDown={true}
                className="hidden lg:flex"
            />

            {/* nav btn for smaller screens */}
            {navOpen 
                ? <IoIosClose className="h-[40px] w-[40px] text-primary lg:hidden" onClick={handleNavClick} /> 
                : <IoMenu className="h-[40px] w-[40px] text-primary lg:hidden" onClick={handleNavClick}/>
            }           
        </nav>
    );
}

export default Navbar;