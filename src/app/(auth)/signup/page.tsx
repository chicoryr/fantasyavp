"use client";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../../firebase/config";
import GoogleAuthButton from "../../../components/GoogleAuthButton";
import { useRouter } from "next/navigation";

export default function Page() {
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })
    const router = useRouter();

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSignup = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        await createUserWithEmailAndPassword(auth, formData.email, formData.password)
            .then((userCredential) => {
                const user = userCredential.user;
                updateProfile(user, { displayName: formData.firstName + " " + formData.lastName });
                router.push("/");
            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage);
            });
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="mb-4 flex justify-center items-center">
                    <GoogleAuthButton text="Sign in with Google" />
                </div>

                {error && <p className="mb-4 text-red-500">{error}</p>}

                <form onSubmit={handleSignup} className="space-y-4">
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label className={LABEL_STYLE}>First name:</label>
                            <input
                                value={formData.firstName}
                                onChange={handleChange}
                                className={INPUT_STYLE}
                                name="firstName"
                            />
                        </div>
                        <div className="flex-1">
                            <label className={LABEL_STYLE}>Last name:</label>
                            <input
                                value={formData.lastName}
                                onChange={handleChange}
                                className={INPUT_STYLE}
                                name='lastName'
                            />
                        </div>
                    </div>
                    <div>
                        <label className={LABEL_STYLE}>Email:</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={INPUT_STYLE}
                            name='email'
                        />
                    </div>

                    <div>
                        <label className={LABEL_STYLE}>Password:</label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={INPUT_STYLE}
                            name='password'
                        />
                    </div>

                    <div>
                        <button type="submit" className="w-full mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


const INPUT_STYLE = 'w-full px-4 py-2 border rounded-md'
const LABEL_STYLE = 'block text-sm font-medium mb-2'