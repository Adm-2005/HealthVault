import Navbar from "../components/Navbar";
import Hero from "../sections/Home/Hero";
import Features from "../sections/Home/Features";
import Explainer from "../sections/Home/Explainer";
import Stats from "../sections/Home/Stats";
import Articles from "../sections/Home/Articles";
import Faqs from "../sections/Home/Faqs";
import Newsletter from "../sections/Home/Newsletter";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen justify-between">
            <Navbar />

            <Hero />

            <Features />

            <Explainer />

            <Stats />

            <Articles />

            <Faqs />

            <Newsletter />

            <Footer />
        </div>
    );
};

export default Home;