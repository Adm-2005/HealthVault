import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UserPackages from "../sections/Profile/SentPackages";

const AllAccessPackages = () => {
    return (
        <div className="flex flex-col justify-between">
            <Navbar />

            <UserPackages mode="fullpage" />

            <Footer />
        </div>
    )
}

export default AllAccessPackages;