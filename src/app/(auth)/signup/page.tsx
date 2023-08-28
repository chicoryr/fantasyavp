"use client";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../../firebase/config"
import GoogleAuthButton from "../../components/GoogleAuthButton";
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
            updateProfile(user, {displayName: firstName + " " + lastName})
            router.push("/");
        })
        .catch((error) => {
            const errorMessage = error.message;
            setError(errorMessage);
        });
    }   
    return (
        <div>
            <GoogleAuthButton text="Sign up with Google"/>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSignup}>
            <div>
                    <label>First name:</label>
                    <input
                        type="name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label>Last name:</label>
                    <input
                        type="name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                
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
                <button type="submit">Sign up</button>
            </form>
        </div>
    );
}