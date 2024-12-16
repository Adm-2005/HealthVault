import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UserRecords from "../sections/Profile/UserRecords";

const AllRecords = () => {
    return (
        <div className="flex flex-col justify-between">
            <Navbar />

            <UserRecords />

            <Footer />
        </div>
    );
}

export default AllRecords;