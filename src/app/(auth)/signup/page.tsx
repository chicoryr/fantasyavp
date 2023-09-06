"use client";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../../firebase/config";
import GoogleAuthButton from "../../../components/GoogleAuthButton";
import { useRouter } from "next/navigation";

export default function Page() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSignup = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                updateProfile(user, { displayName: firstName + " " + lastName });
                router.push("/");
            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage);
            });
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
                <div className="mb-4">
                    <GoogleAuthButton text="Sign up with Google" />
                </div>

                {error && <p className="mb-4 text-red-500">{error}</p>}

                <form onSubmit={handleSignup} className="space-y-4">
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-2">First name:</label>
                            <input
                                type="name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-2">Last name:</label>
                            <input
                                type="name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md"
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
