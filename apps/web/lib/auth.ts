"use server"


import { FormState, LoginFormSchema, SignupFormSchema } from "./type";
import { BACKEND_URL, FRONTEND_URL } from "./constant";
import { redirect } from "next/navigation";
import { createSession, updateToken } from "./session";
import { cookies, headers } from "next/headers";


export async function signUp(
    state: FormState,
    formData: FormData
): Promise<FormState> {
    const validationFields = SignupFormSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!validationFields.success) {
        return {
            error: validationFields.error.flatten().fieldErrors,
        };
    }

    const response = await fetch(`${BACKEND_URL}/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(validationFields.data),
    });
    if (response.ok) {
        redirect('/auth/signin');
    }
    else
        return {
            message:
                response.status === 409
                    ? "User with this email already exists."
                    : response.statusText,
        };
}


export async function signIn(state: FormState, formData: FormData): Promise<FormState> {


    const validatedFields = LoginFormSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors,
        };
    }

    const response = await fetch(`${BACKEND_URL}/auth/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedFields.data),
    });

    if (response.ok) {
        const result = await response.json();
        await createSession({
            user: {
                id: result.id,
                name: result.name,
            },
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
        });
        redirect('/');
    }
    else {
        return {
            message: response.status === 401 ? "Invalid email or password." : response.statusText,
        };
    }
}

export const refreshToken = async (oldRefreshToken: string) => {
    try {
        const response = await fetch(`${BACKEND_URL}/auth/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${oldRefreshToken}`,
            }
        });
        if (!response.ok) {
            //return response;
            throw new Error("Failed to refresh token");
        }
        const { accessToken, refreshToken } = await response.json();

        const host = (await headers()).get("host");
        const base = process.env.NODE_ENV === "development"
            ? `http://${host}`
            : `https://${host}`;

        await fetch(`${base}/api/auth/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: (await cookies()).toString(),
            },
            body: JSON.stringify({ accessToken, refreshToken }),
        });

        return accessToken;
    } catch (error) {
        console.error("Error refreshing token:", error);
        //redirect('/auth/signin');
        return null;
    }
};