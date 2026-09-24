"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/assets/logo.png";

const Navbar = () => {
    const pathname = usePathname();

    const isWorkoutActive = pathname === "/workout";
    const isMyPlanActive = pathname === "/myplan";

    return (
        <header className="sticky top-0 z-50 border-b border-[#1C1F24] bg-[#0C0D10]">
            <nav className="container mx-auto flex h-[74px] items-center justify-between px-6">

                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-3"
                >
                    <Image
                        src={Logo}
                        alt="FitLog Logo"
                        width={22}
                        height={22}
                        className="object-contain"
                    />

                    <span className="text-[17px] font-bold tracking-wide text-white">
                        FITLOG
                    </span>
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center gap-2">
                    <Link
                        href="/workout"
                        className={`rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-200 ${
                            isWorkoutActive
                                ? "bg-[#1A2600] text-[#CCFF00]"
                                : "text-[#D1D5DB] hover:text-[#CCFF00]"
                        }`}
                    >
                        Workout
                    </Link>

                    <Link
                        href="/myplan"
                        className={`rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-200 ${
                            isMyPlanActive
                                ? "bg-[#1A2600] text-[#CCFF00]"
                                : "text-[#D1D5DB] hover:text-[#CCFF00]"
                        }`}
                    >
                        My Plan
                    </Link>
                </div>

                {/* Status Badges */}
                <div className="flex items-center gap-5">

                    {/* Plan */}
                    <Link
                        href="/myplan"
                        className="flex items-center gap-2 text-[13px] text-[#D1D5DB] transition-colors hover:text-[#CCFF00]"
                    >
                        <span>Plan</span>

                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#CCFF00] px-1 text-[11px] font-bold text-black">
                            0
                        </span>
                    </Link>

                    {/* Saved */}
                    <Link
                        href="/saved"
                        className="flex items-center gap-2 text-[13px] text-[#D1D5DB] transition-colors hover:text-[#CCFF00]"
                    >
                        <span>Saved</span>

                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#454A54] px-1 text-[11px] text-[#9CA3AF]">
                            0
                        </span>
                    </Link>

                </div>
            </nav>
        </header>
    );
};

export default Navbar;