import { NextResponse } from "next/server.js";

export async function GET(): Promise<NextResponse> {
    return NextResponse.json({ hello: "world" });
}

