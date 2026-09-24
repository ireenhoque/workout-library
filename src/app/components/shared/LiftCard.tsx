import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ILift } from "@/type/lift.type";

interface LiftCardProps {
    lift: ILift;
}

const LiftCard = ({ lift }: LiftCardProps) => {
    return (
        <Link
            href={`/workout/${lift.id}`}
            className="group block overflow-hidden rounded-xl border border-[#252932] bg-[#15171E] transition-all duration-300 hover:-translate-y-1 hover:border-[#CCFF00]/50 hover:shadow-[0_12px_35px_rgba(0,0,0,0.35)]"
        >
            {/* Image */}
            <div className="relative h-56 overflow-hidden bg-[#0C0D10]">
                <Image
                    src={lift.image}
                    alt={lift.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* Card Content */}
            <div className="p-5">

                {/* Category Tags */}
                <div className="flex flex-wrap gap-2">
                    {lift.muscleGroups.map((muscle) => (
                        <span
                            key={muscle}
                            className="rounded-full border border-[#CCFF00]/30 bg-[#CCFF00]/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#CCFF00]"
                        >
                            {muscle}
                        </span>
                    ))}
                </div>

                {/* Workout Name */}
                <h3 className="mt-4 text-lg font-bold uppercase tracking-wide text-white transition-colors duration-200 group-hover:text-[#CCFF00]">
                    {lift.name}
                </h3>

                {/* Equipment */}
                <p className="mt-2 text-sm text-[#9CA3AF]">
                    {lift.equipment}
                </p>

                {/* Stats */}
                <div className="mt-5 flex items-center justify-between border-t border-[#252932] pt-4">

                    {/* Duration */}
                    <div className="flex items-center gap-1.5 text-xs text-[#D1D5DB]">
                        <span className="text-[#CCFF00]">◷</span>
                        <span>{lift.duration} min</span>
                    </div>

                    {/* Calories */}
                    <div className="flex items-center gap-1.5 text-xs text-[#D1D5DB]">
                        <span className="text-[#CCFF00]">●</span>
                        <span>{lift.caloriesBurned} kcal</span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5 text-xs text-[#D1D5DB]">
                        <span className="text-[#CCFF00]">★</span>
                        <span>{lift.rating}</span>
                    </div>

                </div>
            </div>
        </Link>
    );
};

export default LiftCard;