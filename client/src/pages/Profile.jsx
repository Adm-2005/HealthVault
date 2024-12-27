import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAllRecords } from "../redux/thunks/recordThunks";
import { fetchAllPackages } from "../redux/thunks/packageThunks";
import { fetchDoctorByUserId } from "../redux/thunks/doctorThunks";
import { fetchPatientByUserId } from "../redux/thunks/patientThunks";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Bio from "../sections/Profile/Bio";
import UserRecords from "../sections/Profile/UserRecords";
import SentPackages from "../sections/Profile/SentPackages";
import ReceivedPackages from "../sections/Profile/ReceivedPackages";
import Settings from "../sections/Profile/Settings";

const Profile = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    
    const { currentUser } = useSelector(state => state.user);
    const { currentDoctor, doctorStatus, doctorError } = useSelector(state => state.doctor);
    const { currentPatient, patientStatus, patientError } = useSelector(state => state.patient);

    const { 
        packages, 
        packageFetchStatus, 
        packageCreateStatus, 
        packageGrantStatus, 
        packageRevokeStatus, 
        packageDeleteStatus,
        packageError 
    } = useSelector(state => state.package);
    
    const { 
        records, 
        recordFetchStatus, 
        recordCreateStatus, 
        recordUpdateStatus, 
        recordDeleteStatus,
        recordError 
    } = useSelector(state => state.record);

    const [sentPackages, setSentPackages] = useState([]);
    const [receivedPackages, setReceivedPackages] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                if(currentUser.role === 'doctor') {
                    dispatch(fetchDoctorByUserId(currentUser?.id));
                    dispatch(fetchAllPackages());
                    setReceivedPackages(packages.filter((pkg, index) => pkg.doc_id === currentDoctor?.id));
                } else {
                    dispatch(fetchPatientByUserId(currentUser?.id));
                    dispatch(fetchAllRecords(currentPatient?.id));
                    dispatch(fetchAllPackages());
                    setSentPackages(packages.filter((pkg, index) => pkg.patient_id === currentPatient?.id));
                    setReceivedPackages(packages.filter((pkg, index) => pkg.rec_patient_id === currentPatient?.id)); 
                }
            } catch(error) {
                console.log(error.message);
            }
        } 

        fetchData();
    }, [id, currentDoctor?.id, currentPatient?.id]);

    const handleEditClick = () => {
        console.log(`Edit option clicked`);
    }

    return (
        <div className="flex flex-col gap-11 min-h-screen justify-between">
            <Navbar />

            <Bio
                user={currentUser}
                doctor={currentUser.role === 'doctor' ? currentDoctor : {}}
                handleEditClick={handleEditClick}
            />

            <UserRecords 
                records={records}
                mode="section"
            />

            {currentUser.role === 'patient' && (
                <SentPackages 
                    packages={sentPackages}
                    mode="section"
                />
            )}

            <ReceivedPackages 
                packages={receivedPackages}
                mode="section"
            />

            <Settings user={currentUser} />

            <Footer />
        </div>
    );
}

export default Profile;