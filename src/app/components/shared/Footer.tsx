import React from "react";
import FooterImg from "@/assets/logo.png";
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="border-t border-[#1C1F24] bg-[#0C0D10]">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">

                {/* Logo */}
                <div className="flex items-center gap-3">
                    <Image
                        src={FooterImg}
                        width={20}
                        height={20}
                        alt="FitLog Logo"
                        className="object-contain"
                    />

                    <span className="text-sm font-bold tracking-wide text-white">
                        FITLOG
                    </span>
                </div>

                {/* Copyright */}
                <p className="text-center text-xs text-[#6B7280] sm:text-right">
                    © 2026 FitLog — Workout Library. Train hard, log honest.
                </p>
            </div>
        </footer>
    );
};

export default Footer;