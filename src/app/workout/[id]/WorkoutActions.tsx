"use client";

import React from "react";
import {
  Bookmark,
  CalendarPlus,
} from "lucide-react";

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

  const planIsFull = todaysPlan.length >= 5;

  const handleAddToPlan = () => {
    if (isInPlan) {
      toast.error(
        "This workout is already in today's plan."
      );
      return;
    }

    if (planIsFull) {
      toast.error(
        "Today's plan can contain a maximum of 5 lifts."
      );
      return;
    }

    const added = addToPlan(lift);

    if (added) {
      toast.success(
        "Added to today's plan"
      );
    }
  };

  const handleSave = () => {
    if (isSaved) {
      toast.error(
        "This workout is already saved."
      );
      return;
    }

    const saved = saveWorkout(lift);

    if (saved) {
      toast.success(
        "Workout saved for later"
      );
    }
  };

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {/* Add To Plan */}
      <button
        type="button"
        onClick={handleAddToPlan}
        disabled={isInPlan || planIsFull}
        className={`flex items-center gap-2 rounded-md px-5 py-3 text-xs font-bold transition ${
          isInPlan
            ? "cursor-not-allowed bg-[#687D00] text-black"
            : planIsFull
              ? "cursor-not-allowed bg-[#363A43] text-[#777D88]"
              : "bg-[#CCFF00] text-black hover:bg-[#B3E600]"
        }`}
      >
        <CalendarPlus size={15} />

        {isInPlan
          ? "Added to today's plan"
          : planIsFull
            ? "Plan is full"
            : "Add to today's plan"}
      </button>

      {/* Save For Later */}
      <button
        type="button"
        onClick={handleSave}
        className={`flex items-center gap-2 rounded-md border px-5 py-3 text-xs font-medium transition ${
          isSaved
            ? "border-[#CCFF00] text-[#CCFF00]"
            : "border-[#363A43] text-[#D1D5DB] hover:border-[#CCFF00] hover:text-[#CCFF00]"
        }`}
      >
        <Bookmark size={15} />

        {isSaved
          ? "Saved"
          : "Save for later"}
      </button>
    </div>
  );
};

export default WorkoutActions;