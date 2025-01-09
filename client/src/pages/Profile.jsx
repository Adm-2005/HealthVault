import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
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
import { decodeId } from "../utils/func";

const Profile = () => {
    const { id } = useParams();
    const decodedId = decodeId(id); 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // importing state fields from all respective slices
    const { currentUser, isLoggedIn } = useSelector(state => state.user);
    const { currentDoctor, doctorError } = useSelector(state => state.doctor);
    const { currentPatient, patientError } = useSelector(state => state.patient);

    const { packages, packageError } = useSelector(state => state.package);
    
    const { records, recordError } = useSelector(state => state.record);

    // redirecting to authentication page when not authenticated
    useEffect(() => {
        if(!isLoggedIn) {
            navigate('/auth');
        }
    }, [isLoggedIn, navigate]);

    // fetching packages, records and role related information
    const [sentPackages, setSentPackages] = useState([]);
    const [receivedPackages, setReceivedPackages] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                if(currentUser.role === 'doctor') {
                    dispatch(fetchDoctorByUserId());

                    if(currentDoctor.id != null) {
                        dispatch(fetchAllPackages());
                        setReceivedPackages(packages.filter((pkg, _) => pkg.doc_id === currentDoctor?.id));
                    }
                } else {
                    dispatch(fetchPatientByUserId());
                    
                    if(currentPatient.id != null) {
                        dispatch(fetchAllRecords(currentPatient?.id));
                        dispatch(fetchAllPackages());
                        setSentPackages(packages.filter((pkg, _) => pkg.patient_id === currentPatient?.id));
                        setReceivedPackages(packages.filter((pkg, _) => pkg.rec_patient_id === currentPatient?.id)); 
                    }
                }
            } catch(error) {
                console.log(error.message);
            }
        } 

        fetchData();
    }, [decodedId, currentDoctor?.id, currentPatient?.id]);

    // handling edit
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
};

export default Profile;