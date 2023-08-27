"use client";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase/config"
import GoogleAuthButton from "../components/GoogleAuthButton";
import { Redirect } from "@/helpers";

export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleSignup = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            Redirect("/");
        })
        .catch((error) => {
            const errorMessage = error.message;
            setError(errorMessage);
        });
    }   


    return (
        <div>
            <GoogleAuthButton text="Sign in with Google"/>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSignup}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Sign in</button>
            </form>
        </div>
    );
}