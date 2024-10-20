import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { BsQrCodeScan } from 'react-icons/bs';
import { footerLinks } from '../utils.jsx';

export default function Footer(){
    return(
        <footer className='bg-black text-white relative w-full bottom-0 p-6 flex flex-col items-center lg:items-stretch'>
            <div className='flex flex-col lg:flex-row gap-3 lg:gap-[300px] lg:mb-8'>
                <Link to='/'>
                    <span className='flex gap-2 items-center'>
                        <IconContext.Provider value={{ size: '30px', color: 'white' }}>
                            <BsQrCodeScan />
                        </IconContext.Provider>
                        <h1 className='font-roboto text-2xl lg:text-3xl font-bold text-cyan-700'>
                            HealthVault
                        </h1>
                    </span>
                </Link>

                <ul className='flex flex-col lg:flex-row text-center lg:gap-[80px]'>
                    {footerLinks.map((section, index) => (
                        <li key={index} className='my-4 lg:my-0'>
                            <span className='text-cyan-700 text-xl lg:text-2xl font-roboto font-bold'>{section.section}</span>
                            <ul className='flex flex-col gap-2'>
                                {section.links.map((link, index) => (
                                    <Link to={link.href}>
                                        <li className='text-white hover:text-gray-300 lg:text-lg' key={index}>{link.name}</li>
                                    </Link>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
            <p className='text-center'>
                &copy; All Rights Reserved. <a className='text-blue-300 underline hover:text-purple-600 active:text-purple-600' href='https://akshatmishra.onrender.com' target='_blank'>Akshat Mishra</a>
            </p>
        </footer>
    )
};