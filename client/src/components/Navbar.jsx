import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LiaTimesSolid } from 'react-icons/lia';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsQrCodeScan } from "react-icons/bs";
import { IconContext } from 'react-icons';
import { navLinks } from '../utils.jsx';

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
        <nav className='w-full flex justify-between items-center py-3 pl-3 h-[60px]'>
            {/* mobile nav buttons */}
            <div className='flex items-center gap-3'>
                <IconContext.Provider value={{size: '25px', className: 'cursor-pointer lg:hidden'}}>
                    {
                    nav
                    ? <LiaTimesSolid onClick={handleCloseClick}/>
                    : <GiHamburgerMenu onClick={handleHamClick}/>
                    }
                </IconContext.Provider>
                <Link to='/'>
                    <span className='flex gap-2 items-center'>
                        <IconContext.Provider value={{ size: '30px' }}>
                            <BsQrCodeScan />
                        </IconContext.Provider>
                        <h1 className='font-roboto text-lg font-bold text-cyan-700'>
                            HealthVault
                        </h1>
                    </span>
                </Link>
            </div>

            {/* nav list */}      
            <ul className={nav ? `bg-white absolute left-0 top-[60px] w-full flex flex-col gap-3 divide-y divide-black border-black border-y pb-2` : `hidden lg:flex gap-4`}>
                { navLinks.map((navItem, index) => (
                    <Link to={navItem.href} key={index}>
                        <li className='text-lg m-1 px-2 hover:lg:bg-cyan-50'>{navItem.text}</li>
                    </Link>
                ))}
            </ul>

            <Link to=''>
                <button className='bg-black text-white cursor-pointer font-roboto h-[60px] px-4'>
                    Dashboard
                </button>
            </Link>
        </nav>
    )
}