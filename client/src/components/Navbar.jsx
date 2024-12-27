import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/thunks/userThunks";
import { IoMenu } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import AccountDropdown from "./AccountDropdown";
import logo from "../assets/images/logo.png";
import { navLinks } from "../utils";

const Navbar = () => {
    const [navOpen, setNavOpen] = useState(false);
    const [activeSection, setActiveSection] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavClick = () => setNavOpen(!navOpen);

    useEffect(() => {
        if (location.pathname === "/") {
            const observer = new IntersectionObserver(
                (entries) => entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                }),
                { threshold: 0.5 }
            );

            const sections = document.querySelectorAll("section");
            sections.forEach((section) => observer.observe(section));

            return () => sections.forEach((section) => observer.unobserve(section));
        } else {
            // no nav link is active when pages other than home are open
            setActiveSection(null)
        };
    }, [location.pathname]);

    useEffect(() => {
        if (location.state?.targetId) {
            const targetElement = document.getElementById(location.state.targetId);
            if (targetElement) targetElement.scrollIntoView({ behavior: "smooth" });
        }
    }, [location.state]);

    const handleLinkClick = (event, href) => {
        event.preventDefault();
        const targetId = href.split("#")[1];

        if (href === "#hero") {
            setActiveSection("home");
            scrollToTarget("hero");
        } else if (location.pathname !== "/") {
            navigate("/", { state: { targetId } });
        } else {
            setActiveSection(targetId);
            scrollToTarget(targetId);
        }
    };

    const scrollToTarget = (id) => {
        const targetElement = document.getElementById(id);
        if (targetElement) targetElement.scrollIntoView({ behavior: "smooth" });
    };

    const handleLogoutClick = () => {
        dispatch(logoutUser);
        navigate("/");
    };

    return (
        <nav className="sticky top-0 z-20 bg-white flex w-full p-4 items-center justify-between">
            <div className="flex items-center justify-between bg-white lg:px-[5vw] w-full lg:w-[90vw] mx-auto">
                <Link to="/" className="flex gap-1 items-center">
                    <h1 className="font-open-sans font-bold text-primary-dark text-2xl">Health</h1>
                    <img src={logo} className="h-[30px] w-auto"></img>
                    <h1 className="font-open-sans font-bold text-primary-dark text-2xl">Vault</h1>
                </Link>

                {navOpen ? (
                    <ul className="flex flex-col gap-5 bg-white w-full border divide-y p-4 absolute top-[70px] left-0 right-0">
                        <li>
                            <AccountDropdown 
                                className="flex lg:hidden" 
                                btnHandler={handleLogoutClick}
                            />
                        </li>
                        {navLinks.map((navLink, index) => (
                            <Link
                                key={index}
                                to={navLink.href}
                                onClick={(event) => handleLinkClick(event, navLink.href)}
                                className={`hover:text-accent-green ${
                                    activeSection === navLink.name.toLowerCase()
                                        ? "text-accent-green underline underline-offset-8"
                                        : "text-gray-900"
                                }`}
                            >
                                <li className="text-lg font-open-sans font-medium">{navLink.name}</li>
                            </Link>
                        ))}
                    </ul>
                ) : (
                    <ul className="hidden lg:flex gap-9">
                        {navLinks.map((navLink, index) => (
                            <Link
                                key={index}
                                to={navLink.href}
                                className={`hover:text-accent-green ${
                                    activeSection === navLink.name.toLowerCase()
                                        ? "text-accent-green underline underline-offset-8"
                                        : "text-gray-900"
                                }`}
                                onClick={(event) => handleLinkClick(event, navLink.href)}
                            >
                                <li className="text-md font-open-sans font-semibold">{navLink.name}</li>
                            </Link>
                        ))}
                    </ul>
                )}

                <AccountDropdown 
                    className="hidden lg:flex" 
                    btnHandler={handleLogoutClick} 
                />
                
                {/* nav buttons for smaller screens */}
                {navOpen ? (
                    <IoIosClose
                        className="h-[40px] w-[40px] text-primary lg:hidden"
                        onClick={handleNavClick}
                    />
                ) : (
                    <IoMenu
                        className="h-[40px] w-[40px] text-primary lg:hidden"
                        onClick={handleNavClick}
                    />
                )}
            </div>
        </nav>
    );
};

export default Navbar;