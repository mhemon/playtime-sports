import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { app } from '../Firebase/FirebaseConfig';
import axios from 'axios';

export const AuthContext = createContext(null)


const AuthProvider = ({ children }) => {
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [theme, setTheme] = useState("light")

    useEffect(() => {
        const unsubscribe =  onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            if(currentUser){
                axios.post('https://playtime-sports-server.vercel.app/jwt', {email: currentUser.email})
                .then(data => {
                    localStorage.setItem('access-token', data.data.token)
                    setLoading(false)
                })
            }else{
                // loading false
                localStorage.removeItem('access-token')
                // setLoading(false)
            }
        })

        return () => {
            unsubscribe()
        }
    }, [auth])

    useEffect(() => {
        const thm = localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
        setTheme(thm)
    }, [])

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        setLoading(true)
        return signOut(auth)
    }

    const googleLogin = () => {
        return signInWithPopup(auth, googleProvider)
    }

    const authInfo = {
        user,
        theme,
        setTheme,
        createUser,
        loading,
        loginUser,
        logout,
        googleLogin
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;