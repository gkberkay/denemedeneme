import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import MainPage from "../mainpage/MainPage";
const cookies = new Cookies();

export default function ProtectedRoutes() {
    const cookieToken = cookies.get("token")
    if (cookieToken) {
        return <MainPage />
    }
    return (
        <>
            <Navigate to="/signin" />
        </>
    );
}