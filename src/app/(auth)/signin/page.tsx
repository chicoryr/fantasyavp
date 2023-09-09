"use client";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../../firebase/config"
import GoogleAuthButton from "../../../components/GoogleAuthButton";
import { useRouter } from "next/navigation";

export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    
    const handleSignup = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
        router.push("/");
        })
        .catch((error) => {
            const errorMessage = error.message;
            setError(errorMessage);
        });
    }   

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="bg-teal-800 p-8 rounded-xl shadow-md">
                <div className="mb-4 flex-col justify-center items-center">
                    <GoogleAuthButton text="Sign in with Google" />
                </div>

                {error && <p className="mb-4 text-red-500">{error}</p>}

                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label className={LABEL_STYLE}>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={INPUT_STYLE}
                        />
                    </div>

                    <div>
                        <label className={LABEL_STYLE}>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={INPUT_STYLE}
                        />
                    </div>

                    <div>
                        <button type="submit" className="w-full mt-4 bg-teal-600 text-black p-2 rounded hover:bg-teal-100">
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const INPUT_STYLE = 'w-full px-4 py-2 border border-black rounded-md bg-gray-500'
const LABEL_STYLE = 'block text-sm font-medium mb-2'