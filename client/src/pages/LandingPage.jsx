import Navbar from '../components/Navbar';
import Hero from '../sections/Hero';
import Overview from '../sections/Overview';
import About from '../sections/About';
import Contact from '../sections/Contact';
import Footer from '../components/Footer';

export default function LandingPage() {
    return(
        <div>
            <Navbar />

            <Hero />

            <Overview />

            <About />

            <Contact />

            <Footer />
        </div>
    )
};