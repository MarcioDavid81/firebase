/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { auth } from "../firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

export default function Private({ children }) {

    const [loading, setLoading] = useState(true);
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        async function checkLogin() {
            const unsub = onAuthStateChanged(auth, (user) => {
                if (user) {
                    const userData = {
                        uid: user.uid,
                        email: user.email
                    }

                    localStorage.setItem("@detailUser", JSON.stringify(userData));

                    setLoading(false);
                    setIsLogged(true);
                    
                } else {
                    setLoading(false);
                    setIsLogged(false);
                }
            });
        }

        checkLogin();
    }, []);

    if (loading) {
        return <h1>Carregando...</h1>
    }
    if (!isLogged) {
        return <Navigate to="/" />
    }

    return children;
}