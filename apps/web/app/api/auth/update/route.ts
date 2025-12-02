import { updateToken } from "@/lib/session";
import { NextRequest } from "next/server";


export async function POST(req: NextRequest) {
    const body = await req.json();
    const { refreshToken, accessToken } = body;
    console.log("Update tokens called", { refreshToken, accessToken });
    if (!refreshToken || !accessToken) return new Response("Provide tokens", { status: 401});

    await updateToken({ refreshToken, accessToken });

    return new Response("OK", { status: 200 });
}