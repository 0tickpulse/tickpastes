import { CustomRange, r } from "mythic-language-server/out/utils/positionsAndRanges";
import prisma from "../lib/prisma";
import { overrideGlobalData } from "../lib/lspOverrides";
import PasteCodeBlock from "../components/PasteCodeBlock";

export default async function Home() {
    // overrideGlobalData();
    const code = "function add(a, b) { return a + b; }";
    const ranges = new Map<CustomRange, string>([
        [r(0, 9, 0, 12), "yellow"],
        [r(0, 16, 0, 17), "lightBlue"],
    ]);
    return (
        <main className="">
            <h1>TickPastes</h1>
            <ul>
                {(await prisma.paste.findMany()).map((paste) => (
                    <li key={paste.id}>
                        <PasteCodeBlock paste={paste} />
                    </li>
                ))}
            </ul>
        </main>
    );
}
