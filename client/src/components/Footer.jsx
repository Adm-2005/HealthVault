import { Link } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import { MdEmail } from "react-icons/md";
import logo from "../assets/images/logo.png";
import { footerLinks, smLinks } from "../utils/information";

const Footer = () => {

    return (
        <footer className="flex flex-col w-full py-4 bg-white">
            <div className="flex flex-col bg-white lg:w-[90vw] px-4 lg:px-[5vw] mx-auto">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-9 md:gap-0 py-11">
                    <Link to="/" className="flex gap-1 items-center">
                        <h1 className="font-open-sans font-bold text-primary-dark text-2xl">Health</h1>
                        <img src={logo} className="h-[30px] w-auto"></img>
                        <h1 className="font-open-sans font-bold text-primary-dark text-2xl">Vault</h1>
                    </Link>
                    <div className="flex flex-row justify-between max-w-md md:gap-[60px] font-open-sans font-semibold">
                        {footerLinks.map((section, index) => (
                            <ul key={index} className="flex flex-col gap-3">
                                {section.map((link, idx) => (
                                    <Link key={idx} to={link.href}>
                                        <li className="text-gray-800 hover:text-accent-green">{link.name}</li>
                                    </Link>
                                ))}
                            </ul>
                        ))}
                    </div>
                    <ul className="flex flex-col gap-3">
                        <Link className="flex gap-1" to="mailto:akshatdmishra2005@gmail.com">
                            <MdEmail className="w-[25px] h-[25px] text-primary-dark"/>
                            <li className="text-primary font-open-sans font-semibold">info@healthvault.com</li>
                        </Link>
                        <li className="flex gap-2">
                            {smLinks.map((smLink, index) => (
                                <Link key={index} to={smLink.href}>
                                    <IconContext.Provider value={{ size: '25px', color: '#61E09E' }}>
                                        {smLink.icon}
                                    </IconContext.Provider>
                                </Link>
                            ))}
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col gap-3">
                    <hr></hr>
                    <p className="font-open-sans text-md text-gray-600 mx-auto">
                        &copy; Copyright 2024 <Link className="text-primary hover:text-primary-dark" to="https://akshatmishra.onrender.com">Akshat Mishra</Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;