import { Link } from 'react-router-dom';
import hero from '../assets/images/hero.png';

export default function Hero() {
    return (
        <section id='hero' className='w-full p-6 flex flex-col items-center bg-sky-50'>
            <h1 className='text-center font-roboto font-bold text-[25px]'>
            Manage Your Health Records Safely and Securely
            </h1>
            <p className='text-center my-3 text-gray-700'>
            HealthVault allows you to easily manage, access, and share your medical records with trusted professionals, ensuring your health data stays private and secure.
            </p>
            <img src={hero} className='rounded-md'></img>
            <div className='flex gap-4 mt-5'>
                <button className='bg-cyan-700 font-roboto text-white py-3 px-8 rounded-md'>
                    Sign In
                </button>
                <button className='bg-black font-roboto text-white py-4 px-8 rounded-md'>
                    Sign Up
                </button>
            </div>
        </section>
    )
}