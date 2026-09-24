import type { Metadata } from "next";
import "./globals.css";

import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import { WorkoutProvider } from "@/context/WorkoutContext";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
    title: "FitLog | Workout Library",
    description: "Track your workouts and build your plan.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="flex min-h-screen flex-col bg-[#0C0D10] text-white">

                <WorkoutProvider>

                    <Navbar />

                    <main className="flex-1">
                        {children}
                    </main>

                    <Footer />

                    <Toaster
                        position="top-right"
                        toastOptions={{
                            duration: 2500,
                            style: {
                                background: "#15171E",
                                color: "#FFFFFF",
                                border: "1px solid #252932",
                            },
                        }}
                    />

                </WorkoutProvider>

            </body>
        </html>
    );
}
