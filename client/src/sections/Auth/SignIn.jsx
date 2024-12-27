import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/thunks/userThunks";
import { updateError } from "../../redux/slices/userSlice";
import { BiSolidCommentError } from "react-icons/bi";
import Loading from "../../components/Loading";
import Button from "../../components/ui/Button";
import TextInput from "../../components/ui/TextInput";

const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {currentUser, loginStatus, error} = useSelector(state => state.user);

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleForgotPassword = () => {
        console.log('Forgot Password clicked');
    }

    const handleSignInFormSubmit = (event) => {
        event.preventDefault();
        let formValid = true;
        let errorMessage = '';

        for(let field of ['username', 'password']) {
            if(formData[field] === '') {
                errorMessage = `Please fill out the ${field} field.`
                formValid = false;
                break;
            }
        }

        if(formValid) {
            dispatch(loginUser(formData));
            dispatch(updateError(null));
        } else {
            dispatch(updateError(errorMessage));
        }
    }

    useEffect(() => {
        if(loginStatus === "succeeded") {
            console.log(currentUser);
            navigate(`/profile/${currentUser.id}`);
        }
    }, [loginStatus, navigate]);

    return (
        <div className="relative">
            {loginStatus === "loading" && (
                <div className="absolute inset-0 bg-gray-300 opacity-50 z-10 flex items-center justify-center">
                    <Loading text="Logging in..." />
                </div>
            )}

            <form
                id="sign-in"
                onSubmit={handleSignInFormSubmit}
                className="flex flex-col gap-4 p-4 rounded-b-md border"
            >
                <TextInput
                    name="username"
                    label="Username"
                    placeholder="johndoe"
                    value={formData.username}
                    onChange={handleInputChange}
                />
                <TextInput
                    password={true}
                    name="password"
                    label="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                />
                <p
                    onClick={handleForgotPassword}
                    className="text-accent-green hover:text-green-800 font-open-sans font-semibold cursor-pointer"
                >
                    Forgot Password?
                </p>
                <Button
                    type="submit"
                    text="Submit"
                />
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

export default SignIn;