"use server"

import { redirect } from "next/navigation";
import { authFetch } from "./authFetch";
import { BACKEND_URL } from "./constant";



export const getDashboard = async () => {
    // const session = await getSession();
    // const response = await fetch(`${BACKEND_URL}/auth/protected`, {
    //     headers: {
    //         Authorization: `Bearer ${session?.accessToken}`,
    //     },
    // });

    const response = await authFetch(`${BACKEND_URL}/auth/protected`);
    const result = await response.json();
    if(result.statusCode === 401){
        redirect('/auth/signin');
    }
    return result;
}