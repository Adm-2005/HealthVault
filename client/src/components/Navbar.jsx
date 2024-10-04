import { useState } from 'react';
import { LiaTimesSolid } from 'react-icons/lia';
import { PiVaultFill } from 'react-icons/pi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdContact } from 'react-icons/io';
import { IconContext } from 'react-icons';
import '../styles/components/Navbar.css';

const navLinks = [
    {
        text: 'Home',
        href: '/'
    },
    {
        text: 'About',
        href: ''
    },
    {
        text: 'Contact',
        href: ''
    }
];

export default function Navbar(){
    const [nav, setNav] = useState(false);

    const handleHamClick = () => {
        setNav(true);
    };

    const handleCloseClick = () => {
        setNav(false);
    };

    const handleDashboardClick = () => {
        console.log("Dashboard Clicked");
    };

    return(
        <nav className='nav'>
            <div className='nav-logo-container'>
                <IconContext.Provider value={{size:'30px'}}>
                    <PiVaultFill/>
                </IconContext.Provider>
                <h1 className='nav-logo-text'>HealthVault</h1>
            </div>

            {/* full width nav */}
            <ul>
                {navLinks.map((link) => (
                    <li key={link.text}><a href={link.href}>{link.text}</a></li>
                ))}
            </ul>

            {/* ḥam menu */}
            <div className={nav ? 'ham-menu inactive' : 'ham-menu'}>
                <IconContext.Provider value={{size:'30px'}}>
                    <GiHamburgerMenu onClick={handleHamClick}/>
                </IconContext.Provider>
            </div>

            {/* close menu */}
            <div className={nav ? 'close-ham-menu' : 'close-ham-menu inactive'}>
                <IconContext.Provider value={{size:'30px'}}>
                    <LiaTimesSolid onClick={handleCloseClick}/>
                </IconContext.Provider>
            </div>

            {/* dashboard icon */}
            <div className='dashboard-icon'>
                <IconContext.Provider value={{size:'30px'}}>
                    <IoMdContact onClick={handleDashboardClick}/>
                </IconContext.Provider>
            </div>
        </nav>
    )
}