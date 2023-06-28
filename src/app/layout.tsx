import "./globals.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({
    weight: ["400", "700"],
    subsets: ["latin-ext"],
});

export const metadata = {
    title: "TickPastes",
    description: "A simple pastebin for your code snippets.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={roboto.className}>{children}</body>
        </html>
    );
}
