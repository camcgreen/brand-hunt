"use client";

import Header from "@/app/components/common/Header";
import Jigsaw from "@/app/components/puzzle/Jigsaw";

export default function Home() {
    return (
        <>
            <Header />
            <main className="relative h-screen-sm pt-16">
                <Jigsaw />
            </main>
        </>
    );
}
