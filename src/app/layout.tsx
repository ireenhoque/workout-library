import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "FitLog | Workout Library",
    description:
        "Track your workouts, plan your training, and log every set.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            data-theme="dark"
            className={`${geistSans.variable} ${geistMono.variable}`}
        >
            <body className="flex min-h-screen flex-col bg-[#0C0D10] text-white antialiased">

                {/* Navbar */}
                <Navbar />

                {/* Page Content */}
                <main className="flex-1">
                    {children}
                </main>

                {/* Footer */}
                <Footer />

            </body>
        </html>
    );
}
