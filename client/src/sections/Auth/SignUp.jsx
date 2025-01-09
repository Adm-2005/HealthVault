import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BiSolidCommentError } from "react-icons/bi";
import { updateError } from "../../redux/slices/userSlice";
import { registerUser } from "../../redux/thunks/userThunks";
import Button from "../../components/ui/Button";
import Loading from "../../components/Loading";
import TextInput from "../../components/ui/TextInput";
import SelectInput from "../../components/ui/SelectInput";
import { encodeId } from "../../utils/func";

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {currentUser, registerStatus, error} = useSelector(state => state.user); 

    const [currStep, setCurrStep] = useState(1);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
        role: '-- Select an Option --',
        license_number: '',
        specialization: '-- Select an Option --',
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleRoleChange = (option) => {
        setFormData({...formData, role: option});
    }

    const handleSpecializationChange = (option) => {
        setFormData({...formData, specialization: option})
    }

    const handleBackClick = () => {
        setCurrStep((prevStep) => prevStep - 1);
    }

    const handleNextClick = () => {
        let stepValid = true;
        let errorMessage = '';
        let requiredFields = [];

        if(currStep === 1) {
            requiredFields = ['first_name', 'last_name', 'email', 'username', 'password'];
        } else if(currStep === 2) {
            requiredFields = ['city', 'state', 'country'];
        }

        for(let field of requiredFields) {
            if(formData[field] === '') {
                errorMessage = `Please fill out the ${field.replace('_', ' ')} field.`
                stepValid = false;
                break;
            } 
        }

        if(stepValid) {
            setCurrStep((prevStep) => prevStep + 1);
            dispatch(updateError(null));
        } else {
            dispatch(updateError(errorMessage));
        }
    }

    const handleSignUpFormSubmit = (event) => {
        event.preventDefault();

        let requiredFields = [];
        let errorMessage = '';
        let formValid = true;

        if(formData.role === '-- Select an Option --') {
            errorMessage = `Please select a role.`;
            formValid = false;
        } else {
            requiredFields = formData.role === 'doctor' ? ['license_number'] : [];

            for(let field of requiredFields) {
                if(formData[field].trim() === '') {
                    formValid = false;
                    errorMessage = `Please fill out the ${field.replace('_', ' ')} field.`;
                    break;
                }
            }
        }

        if(formValid) {
            dispatch(registerUser(formData));
            dispatch(updateError(null));
        } else {
            dispatch(updateError(errorMessage));
        }
    }

    useEffect(() => {
        if(registerStatus === 'succeeded') {
            navigate(`/profile/${encodeId(currentUser.id)}`);
        }
    }, [registerStatus, navigate]);

    return (
        <div className="relative">
            {registerStatus === 'loading' && (
                <div className="absolute inset-0 bg-gray-300 opacity-50 z-10 flex items-center justify-center">
                    <Loading text="Registering..." />
                </div>
            )}
            <form
                id="sign-up"
                className={`flex flex-col gap-4 p-4 rounded-b-md border ${registerStatus === 'loading' ? 'opacity-50 pointer-events-none' : ''}`}
            >
                {currStep === 1 && (
                    <>
                        <p className="font-open-sans font-semibold text-accent-green">Step 1: Personal Info</p>
            
                        <TextInput
                            color="primary"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleInputChange}
                            label="First Name*"
                            placeholder="e.g. John"
                        />
                        <TextInput
                            color="primary"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleInputChange}
                            label="Last Name*"
                            placeholder="e.g. Doe"
                        />
                        <TextInput
                            color="primary"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            label="Username*"
                            placeholder="e.g. johndoe"
                        />
                        <TextInput
                            color="primary"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            label="Email Address*"
                            placeholder="e.g. johndoe@xyz.com"
                        />
                        <TextInput
                            color="primary"
                            password={true}
                            name="password"
                            label="Password*"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </>
                )}
                {currStep === 2 && (
                    <>
                        <p className="font-open-sans font-semibold text-accent-green">Step 2: Location Info</p>
            
                        <TextInput
                            color="primary"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            label="City*"
                            placeholder="e.g. Mumbai"
                        />
                        <TextInput
                            color="primary"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            label="State*"
                            placeholder="e.g. Maharashtra"
                        />
                        <TextInput
                            color="primary"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            label="Country*"
                            placeholder="e.g. India"
                        />
                        <TextInput
                            color="primary"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleInputChange}
                            label="Pincode"
                            placeholder="e.g. 400063"
                        />
                    </>
                )}
            
                {currStep === 3 && (
                    <>
                        <p className="font-open-sans font-semibold text-accent-green">Step 3: Role Info</p>
            
                        <SelectInput
                            options={['Patient', 'Doctor']}
                            color="primary"
                            label="User Role*"
                            onChange={handleRoleChange}
                        />
                        {formData.role === 'doctor' && (
                            <>
                                <TextInput
                                    color="primary"
                                    name="license_number"
                                    label="License Number*"
                                    onChange={handleInputChange}
                                    placeholder="e.g. MMC/12345/2024"
                                />
                                <SelectInput
                                    options={['Allergy', 'Allergy & Immunology', 'Clinical & Laboratory Immunology', 'Family Medicine', 'Neurocritical Care', 'Neurology', 'Other']}
                                    color="primary"
                                    label="Specialization"
                                    onChange={handleSpecializationChange}
                                />
                                {formData.specialization === 'Other' && (
                                    <TextInput
                                        color="primary"
                                        label="Other"
                                        name="specialization"
                                        onChange={handleInputChange}
                                    />
                                )}
                            </>
                        )}
                    </>
                )}
                <div className="flex gap-1 justify-between">
                    <Button
                        type="button"
                        text="Back"
                        colorSet={`${currStep === 1 ? 'secondary' : 'primary'}`}
                        onClick={handleBackClick}
                    />
                    {currStep < 3 && (
                        <Button
                            type="button"
                            text="Next"
                            colorSet="black"
                            onClick={handleNextClick}
                        />
                    )}
                    {currStep === 3 && (
                        <Button
                            type="submit"
                            text="Submit"
                            colorSet="black"
                            onClick={handleSignUpFormSubmit}
                        />
                    )}
                </div>
            </form>

            {error && (
                <div className="flex gap-1 items-center justify-center py-2 text-red-600">
                    <BiSolidCommentError className="h-[20px] w-[20px]" />
                    <p className="font-open-sans text-md">{error}</p>
                </div>
            )}
        </div>
    );
}

export default SignUp;