"use client";

import React from "react";
import { Bookmark, CalendarPlus } from "lucide-react";
import toast from "react-hot-toast";

import { ILift } from "@/type/lift.type";
import { useWorkout } from "@/context/WorkoutContext";

interface WorkoutActionsProps {
    lift: ILift;
}

const WorkoutActions = ({
    lift,
}: WorkoutActionsProps) => {
    const {
        todaysPlan,
        savedWorkouts,
        addToPlan,
        saveWorkout,
    } = useWorkout();

    const isInPlan = todaysPlan.some(
        (item) => item.id === lift.id
    );

    const isSaved = savedWorkouts.some(
        (item) => item.id === lift.id
    );

    const handleAddToPlan = () => {
        if (isInPlan) {
            toast.error("This workout is already in today's plan.");
            return;
        }

        if (todaysPlan.length >= 5) {
            toast.error("Today's plan can contain a maximum of 5 lifts.");
            return;
        }

        const added = addToPlan(lift);

        if (added) {
            toast.success("Added to today's plan");
        }
    };

    const handleSave = () => {
        if (isSaved) {
            toast.error("This workout is already saved.");
            return;
        }

        const saved = saveWorkout(lift);

        if (saved) {
            toast.success("Workout saved for later");
        }
    };

    return (
        <div className="mt-7 flex flex-wrap gap-3">

            {/* Add to Today's Plan */}
            <button
                type="button"
                onClick={handleAddToPlan}
                className={`flex items-center gap-2 rounded-md px-5 py-3 text-xs font-bold transition ${
                    isInPlan
                        ? "cursor-not-allowed bg-[#687D00] text-black"
                        : "bg-[#CCFF00] text-black hover:bg-[#B3E600]"
                }`}
            >
                <CalendarPlus size={14} />

                {isInPlan
                    ? "Added to today's plan"
                    : "Add to today's plan"}
            </button>

            {/* Save for Later */}
            <button
                type="button"
                onClick={handleSave}
                className={`flex items-center gap-2 rounded-md border px-5 py-3 text-xs transition ${
                    isSaved
                        ? "border-[#CCFF00] text-[#CCFF00]"
                        : "border-[#363A43] text-[#D1D5DB] hover:border-[#CCFF00] hover:text-[#CCFF00]"
                }`}
            >
                <Bookmark size={14} />

                {isSaved
                    ? "Saved"
                    : "Save for later"}
            </button>

        </div>
    );
};

export default WorkoutActions;