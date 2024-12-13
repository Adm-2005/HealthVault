import Navbar from "../components/Navbar";
import Hero from "../sections/Hero";
import Features from "../sections/Features";
import Explainer from "../sections/Explainer";
import Stats from "../sections/Stats";
import Articles from "../sections/Articles";
import Faqs from "../sections/Faqs";
import Newsletter from "../sections/Newsletter";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <>
            <Navbar />

            <Hero />

            <Features />

            <Explainer />

            <Stats />

            <Articles />

            <Faqs />

            <Newsletter />

            <Footer />
        </>
    );
}

export default Home;