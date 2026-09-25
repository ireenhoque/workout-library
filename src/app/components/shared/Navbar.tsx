"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import Logo from "@/assets/logo.png";
import { useWorkout } from "@/context/WorkoutContext";

const Navbar = () => {
    const pathname = usePathname();

    const {
        todaysPlan,
        savedWorkouts,
    } = useWorkout();

    return (
        <header className="border-b border-[#1C1F24] bg-[#0C0D10]">
            <div className="container mx-auto flex h-[74px] items-center justify-between px-6">

                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2"
                >
                    <Image
                        src={Logo}
                        alt="FitLog Logo"
                        width={22}
                        height={22}
                    />

                    <span className="font-bold text-white">
                        FITLOG
                    </span>
                </Link>

                {/* Navigation */}
                <nav className="flex items-center gap-3">

                    <Link
                        href="/"
                        className={`rounded-full px-4 py-2 text-xs ${
                            pathname === "/"
                                ? "bg-[#1A2600] text-[#CCFF00]"
                                : "text-[#D1D5DB]"
                        }`}
                    >
                        Workouts
                    </Link>

                    <Link
                        href="/my-plan"
                        className={`rounded-full px-4 py-2 text-xs ${
                            pathname === "/my-plan"
                                ? "bg-[#1A2600] text-[#CCFF00]"
                                : "text-[#D1D5DB]"
                        }`}
                    >
                        My Plan
                    </Link>

                </nav>

                {/* Counters */}
                <div className="flex items-center gap-3 text-xs">

                    <Link
                        href="/my-plan"
                        className="flex items-center gap-2 text-[#D1D5DB]"
                    >
                        Plan

                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#CCFF00] px-1 font-bold text-black">
                            {todaysPlan.length}
                        </span>
                    </Link>

                    <Link
                        href="/my-plan"
                        className="flex items-center gap-2 text-[#D1D5DB]"
                    >
                        Saved

                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#454A54] px-1 text-[#9CA3AF]">
                            {savedWorkouts.length}
                        </span>
                    </Link>

                </div>

            </div>
        </header>
    );
};

export default Navbar;