import { NextRequest, NextResponse } from "next/server";
import { deleteSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { BACKEND_URL } from "@/lib/constant";
import { authFetch } from "@/lib/authFetch";


export async function GET(req: NextRequest) {
    const response = await authFetch(`${BACKEND_URL}/auth/signout`,
        {
            method: "POST",
        }
    );
    if (response.ok) {
        await deleteSession();
    }

    revalidatePath('/auth/signin');
    return NextResponse.redirect(new URL('/auth/signin', req.nextUrl));
}