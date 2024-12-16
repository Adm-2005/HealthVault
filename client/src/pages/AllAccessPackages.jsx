import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UserPackages from "../sections/Profile/UserPackages";

const AllAccessPackages = () => {
    return (
        <div className="flex flex-col justify-between">
            <Navbar />

            <UserPackages />

            <Footer />
        </div>
    )
}

export default AllAccessPackages;