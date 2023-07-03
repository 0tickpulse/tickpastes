import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { generateDocFromPaste } from "../../../../lib/docGenerator";

export async function GET(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
    const paste = await prisma.paste.findFirst({
        where: {
            id: params.id,
        },
    });
    if (!paste) {
        return NextResponse.json({
            error: "Paste not found",
        });
    }
    const doc = generateDocFromPaste(paste);
    return NextResponse.json(doc);
}
