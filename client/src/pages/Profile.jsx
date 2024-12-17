import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Bio from "../sections/Profile/Bio";
import UserRecords from "../sections/Profile/UserRecords";
import SentPackages from "../sections/Profile/SentPackages";
import ReceivedPackages from "../sections/Profile/ReceivedPackages";
import Settings from "../sections/Profile/Settings";

const Profile = () => {
    return (
        <div className="flex flex-col gap-11 min-h-screen justify-between">
            <Navbar />

            <Bio />

            <UserRecords />

            <SentPackages />

            <ReceivedPackages />

            <Settings />

            <Footer />
        </div>
    );
}

export default Profile;