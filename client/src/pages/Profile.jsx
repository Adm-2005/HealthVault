import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Profile = () => {
    return (
        <div className="flex flex-col min-h-screen justify-between">
            <Navbar />

            <Footer />
        </div>
    );
}

export default Profile;