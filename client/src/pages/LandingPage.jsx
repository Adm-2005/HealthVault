import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/pages/LandingPage.css';

export default function LandingPage() {
    const [scanner, setScanner] = useState(false);

    return(
        <div>
            {/* navbar */}
            <Navbar />

            {/* hero */}
            <section className='hero'>
                <div className='qr-container'>
                    <img src='/images/hero-qrcode.png' width='300px' height='300px'></img>
                </div>
                <div className={scanner ? 'scanner' : 'scanner inactive'}>
                    <hr />
                </div>
                <div className={scanner ? 'hero-txt inactive' : 'hero-txt'}>
                    <h1>Welcome to HealthVault!</h1>
                    <p></p>
                </div>
                <div>
                    <button className='btn' id='login-btn' type='button'>Sign In</button>
                    <button className='btn' id='signup-btn' type='button'>Sign Up</button>
                </div>
            </section>

            {/* footer */}
            <Footer />
        </div>
    )
};