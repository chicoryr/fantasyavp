"use client"
import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  User,
} from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";

interface AuthContext {
    user: User | null
    loading: boolean
    googleSignIn: () => void
    logOut: () => void
}

const AuthContext = createContext<AuthContext>({user: null} as AuthContext);

export const AuthContextProvider = ({
children,
}: {
    children: React.ReactNode
  }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then(() => {
                router.push("/")
            })
      };

    const logOut = () => {
        signOut(auth);
      };

      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          setLoading(false);
        });
        return () => unsubscribe();
      }, [user]);

    return (
        <AuthContext.Provider value={{ user, loading, googleSignIn, logOut }}>
          {children}
        </AuthContext.Provider>
      );
};

export const UserAuth = () => {
    return useContext(AuthContext);
}
