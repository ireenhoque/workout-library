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
            <div className="container mx-auto px-4 sm:px-6">

                <div className="flex min-h-[74px] items-center justify-between">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex shrink-0 items-center gap-2"
                    >
                        <Image
                            src={Logo}
                            alt="Workout Library Logo"
                            width={22}
                            height={22}
                        />

                        <span className="text-sm font-bold tracking-wide text-white sm:text-base">
                            WORKOUT LIBRARY
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center gap-2 md:flex">

                        <Link
                            href="/"
                            className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                                pathname === "/"
                                    ? "bg-[#1A2600] text-[#CCFF00]"
                                    : "text-[#D1D5DB] hover:bg-[#15171E] hover:text-white"
                            }`}
                        >
                            Workouts
                        </Link>

                        <Link
                            href="/my-plan"
                            className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                                pathname === "/my-plan"
                                    ? "bg-[#1A2600] text-[#CCFF00]"
                                    : "text-[#D1D5DB] hover:bg-[#15171E] hover:text-white"
                            }`}
                        >
                            My Plan
                        </Link>

                    </nav>

                    {/* Counters */}
                    <div className="flex shrink-0 items-center gap-2 sm:gap-3">

                        <Link
                            href="/my-plan"
                            className="flex items-center gap-1.5 text-xs text-[#D1D5DB] transition hover:text-white sm:gap-2"
                        >
                            <span className="hidden xs:inline">
                                Plan
                            </span>

                            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#CCFF00] px-1 font-bold text-black">
                                {todaysPlan.length}
                            </span>
                        </Link>

                        <Link
                            href="/my-plan"
                            className="flex items-center gap-1.5 text-xs text-[#D1D5DB] transition hover:text-white sm:gap-2"
                        >
                            <span className="hidden xs:inline">
                                Saved
                            </span>

                            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#454A54] px-1 text-[#9CA3AF]">
                                {savedWorkouts.length}
                            </span>
                        </Link>

                    </div>

                </div>

                {/* Mobile Navigation */}
                <nav className="flex items-center justify-center gap-2 border-t border-[#1C1F24] py-2.5 md:hidden">

                    <Link
                        href="/"
                        className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                            pathname === "/"
                                ? "bg-[#1A2600] text-[#CCFF00]"
                                : "text-[#D1D5DB] hover:bg-[#15171E] hover:text-white"
                        }`}
                    >
                        Workouts
                    </Link>

                    <Link
                        href="/my-plan"
                        className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                            pathname === "/my-plan"
                                ? "bg-[#1A2600] text-[#CCFF00]"
                                : "text-[#D1D5DB] hover:bg-[#15171E] hover:text-white"
                        }`}
                    >
                        My Plan
                    </Link>

                </nav>

            </div>
        </header>
    );
};

export default Navbar;