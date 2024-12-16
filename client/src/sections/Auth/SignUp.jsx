import { useState } from "react";
import Button from "../../components/ui/Button";
import TextInput from "../../components/ui/TextInput";
import SelectInput from "../../components/ui/SelectInput";

const SignUp = () => {
    const [currStep, setCurrStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
        userRole: '-- Select an Option --',
        licenseNumber: '',
        specialization: '-- Select an Option --',
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleUserRoleChange = (option) => {
        setFormData({...formData, userRole: option});
    }

    const handleSpecializationChange = (option) => {
        setFormData({...formData, specialization: option})
    }

    const handleBackClick = () => {
        setCurrStep((prevStep) => prevStep - 1);
    }

    const handleNextClick = () => {
        setCurrStep((prevStep) => prevStep + 1);
    }

    const handleSignUpFormSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <form 
            id="sign-up"
            onSubmit={handleSignUpFormSubmit}
            className="flex flex-col gap-4 p-4 rounded-b-md border"    
        >
            {currStep === 1 && (
                <>
                    <p className="font-open-sans font-semibold text-accent-green">Step 1: Personal Info</p>
                    
                    <TextInput
                        color="primary"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        label="First Name"
                        placeholder="John"
                    />

                    <TextInput
                        color="primary"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        label="Last Name"
                        placeholder="Doe"
                    />

                    <TextInput
                        color="primary"
                        value={formData.userName}
                        onChange={handleInputChange}
                        label="Username"
                        placeholder="johndoe"
                    />

                    <TextInput
                        color="primary"
                        value={formData.email}
                        onChange={handleInputChange}
                        label="Email Address"
                        placeholder="johndoe@xyz.com"
                    />

                    <TextInput
                        color="primary"
                        value={formData.password}
                        onChange={handleInputChange}
                        label="Password"
                        password={true}
                    />

                </>
            )}

            {currStep === 2 && (
                <>
                    <p className="font-open-sans font-semibold text-accent-green">Step 2: Location Info</p>
                
                    <TextInput 
                        color="primary"
                        value={formData.city}
                        onChange={handleInputChange}
                        label="City"
                        placeholder="e.g. Mumbai"
                    />

                    <TextInput 
                        color="primary"
                        value={formData.state}
                        onChange={handleInputChange}
                        label="State"
                        placeholder="e.g. Maharashtra"
                    />

                    <TextInput 
                        color="primary"
                        value={formData.country}
                        onChange={handleInputChange}
                        label="Country"
                        placeholder="e.g. India"
                    />

                    <TextInput 
                        color="primary"
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
                        label="User Role"
                        onChange={handleUserRoleChange}
                    />

                    {formData.userRole === 'Doctor' && (
                        <>
                            <TextInput 
                                color="primary"
                                label="License Number"
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
                    />
                )}
            </div>
        </form>
    );
}

export default SignUp;