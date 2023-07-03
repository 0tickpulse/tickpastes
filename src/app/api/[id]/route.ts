import { NextRequest, NextResponse } from "next/server.js";
import prisma from "../../../lib/prisma.js";

export async function GET(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
    return NextResponse.json(
        await prisma.paste.findFirst({
            where: {
                id: params.id,
            },
        })
    );
}

export async function POST(request: NextRequest): Promise<NextResponse> {
}
