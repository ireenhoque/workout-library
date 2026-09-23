import React from "react";
import BannerImg from "@/assets/banner.png";
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
    return (
        <section className="container mx-auto my-11 px-6">
            <div className="flex min-h-[410px] flex-col items-center justify-between gap-10 overflow-hidden rounded-2xl border border-[#252932] bg-[#15171E] px-8 py-12 md:flex-row md:px-12 lg:px-13">

                {/* Content */}
                <div className="w-full md:max-w-[600px]">

                    {/* Small Heading */}
                    <p className="text-[12px] font-bold tracking-[2px] text-[#CCFF00]">
                        WORKOUT LIBRARY
                    </p>

                    {/* Main Heading */}
                    <h1 className="mt-5 text-[40px] font-extrabold leading-[1.02] tracking-[-1px] text-white sm:text-[46px] md:text-[48px]">
                        TRAIN WITH INTENT. LOG
                        <br />
                        EVERY SET.
                    </h1>

                    {/* Description */}
                    <p className="mt-5 max-w-[620px] text-[15px] leading-6 text-[#9CA3AF]">
                        FitLog is a dark, no-nonsense gym companion: pick a lift,
                        lock it into today's plan, and watch the week's work add up.
                    </p>

                    {/* Button */}
                    <Link
                        href="/workout"
                        className="mt-7 inline-flex rounded-md bg-[#CCFF00] px-6 py-3 text-[12px] font-bold text-black transition-all duration-300 hover:bg-[#B3E600] hover:shadow-[0_0_20px_rgba(204,255,0,0.15)]"
                    >
                        BROWSE WORKOUTS
                    </Link>
                </div>

                {/* Banner Image */}
                <div className="flex w-full justify-center md:w-[42%] md:justify-end">
                    <Image
                        src={BannerImg}
                        alt="Workout illustration"
                        priority
                        className="h-auto w-[280px] object-contain sm:w-[320px] md:w-[350px] lg:w-[380px]"
                    />
                </div>
            </div>
        </section>
    );
};

export default Banner;