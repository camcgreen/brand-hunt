import type { Metadata } from "next";
import { Lexend_Giga } from "next/font/google";
import "@/app/globals.css";

const lexendGiga = Lexend_Giga({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={lexendGiga.className}>{children}</body>
        </html>
    );
}