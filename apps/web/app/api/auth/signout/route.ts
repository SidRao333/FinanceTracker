import { NextRequest, NextResponse } from "next/server";
import { deleteSession } from "@/lib/session";
import { revalidatePath } from "next/cache";


export async function GET(req:NextRequest) {
    await deleteSession();
    revalidatePath('/auth/signin');
    return NextResponse.redirect(new URL('/auth/signin',req.nextUrl));
}