import Navbar from "./Navbar"
import { useUser } from '@auth0/nextjs-auth0';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { currentUser } from "../context/slices/userSlice";

export default function Layout({ children }) {

    const { user, error, isLoading } = useUser();

    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            dispatch(currentUser(user));
        }
    }, [user])

    return (
        <>
            <Navbar />
            {children}
        </>
    )
}
