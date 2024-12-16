import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import TextInput from "../../components/ui/TextInput";

const SignIn = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleForgotPassword = () => {

    }

    const handleSignInFormSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <form
            id="sign-in"
            onSubmit={handleSignInFormSubmit}
            className="flex flex-col gap-4 p-4 rounded-b-md border"
        >
            <TextInput
                value={userName}
                label="Username"
                placeholder="johndoe"
                onChange={(e) => setUserName(e.target.value)}
            />

            <TextInput 
                value={password}
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                password={true}
            />

            <p 
                onClick={handleForgotPassword}
                className="text-accent-green font-open-sans font-semibold cursor-pointer"
            >
                Forgot Password?
            </p>

            <Button 
                type="submit"
                text="Submit"
            />
        </form>
    );
}

export default SignIn;