"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  ChevronDown,
  Clock3,
  Flame,
  Star,
  X,
} from "lucide-react";

import { ILift } from "@/type/lift.type";
import { useWorkout } from "@/context/WorkoutContext";

type ActiveTab = "plan" | "saved";

type SortOption = "duration" | "calories" | "rating";

const MyPlanPage = () => {
  const {
    todaysPlan,
    savedWorkouts,
    removeFromPlan,
    removeSavedWorkout,
  } = useWorkout();

  const [activeTab, setActiveTab] =
    useState<ActiveTab>("plan");

  const [sortBy, setSortBy] =
    useState<SortOption>("duration");

  // Current list based on active tab
  const currentList =
    activeTab === "plan"
      ? todaysPlan
      : savedWorkouts;

  // Sort current list
  const sortedList = useMemo(() => {
    const sorted = [...currentList];

    if (sortBy === "duration") {
      sorted.sort(
        (a, b) => a.duration - b.duration
      );
    }

    if (sortBy === "calories") {
      sorted.sort(
        (a, b) =>
          a.caloriesBurned - b.caloriesBurned
      );
    }

    if (sortBy === "rating") {
      sorted.sort(
        (a, b) => b.rating - a.rating
      );
    }

    return sorted;
  }, [currentList, sortBy]);

  // Today's Plan metrics
  const totalMinutes = useMemo(() => {
    return todaysPlan.reduce(
      (total, lift) => total + lift.duration,
      0
    );
  }, [todaysPlan]);

  const totalCalories = useMemo(() => {
    return todaysPlan.reduce(
      (total, lift) =>
        total + lift.caloriesBurned,
      0
    );
  }, [todaysPlan]);

  return (
    <main className="min-h-screen bg-[#0C0D10] px-4 py-10 sm:px-6 lg:px-8">
      <section className="container mx-auto">

        {/* ========================================
            PAGE HEADER
        ========================================= */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            MY PLAN
          </h1>

          <p className="mt-2 text-sm text-[#9CA3AF]">
            Cap of five lifts for today. Finish them,
            then load more.
          </p>
        </div>

        {/* ========================================
            METRICS
        ========================================= */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

          <MetricCard
            title="Exercises"
            value={todaysPlan.length}
          />

          <MetricCard
            title="Minutes"
            value={totalMinutes}
          />

          <MetricCard
            title="Calories"
            value={totalCalories}
          />

        </div>

        {/* ========================================
            TABS + SORT
        ========================================= */}
        <div className="mt-8 flex flex-col gap-4 border-b border-[#252932] sm:flex-row sm:items-end sm:justify-between">

          {/* Tabs */}
          <div className="flex gap-2">

            <button
              type="button"
              onClick={() =>
                setActiveTab("plan")
              }
              className={`px-5 py-3 text-xs font-bold transition ${
                activeTab === "plan"
                  ? "border-b-2 border-[#CCFF00] text-[#CCFF00]"
                  : "text-[#6B7280] hover:text-white"
              }`}
            >
              TODAY'S PLAN
            </button>

            <button
              type="button"
              onClick={() =>
                setActiveTab("saved")
              }
              className={`px-5 py-3 text-xs font-bold transition ${
                activeTab === "saved"
                  ? "border-b-2 border-[#CCFF00] text-[#CCFF00]"
                  : "text-[#6B7280] hover:text-white"
              }`}
            >
              SAVED
            </button>

          </div>

          {/* ========================================
              SORT DROPDOWN
          ========================================= */}
          <div className="relative mb-2 w-full sm:w-48">

            <label
              htmlFor="sort-workouts"
              className="sr-only"
            >
              Sort workouts
            </label>

            <select
              id="sort-workouts"
              value={sortBy}
              onChange={(event) =>
                setSortBy(
                  event.target.value as SortOption
                )
              }
              className="w-full appearance-none rounded-md border border-[#363A43] bg-[#15171E] py-3 pl-4 pr-10 text-xs font-bold uppercase tracking-wide text-white outline-none transition focus:border-[#CCFF00]"
            >
              <option value="duration">
                Duration
              </option>

              <option value="calories">
                Calories
              </option>

              <option value="rating">
                Rating
              </option>
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#CCFF00]"
            />

          </div>

        </div>

        {/* ========================================
            WORKOUT LIST
        ========================================= */}
        <div className="mt-6">

          {sortedList.length === 0 ? (
            <EmptyState
              isPlan={activeTab === "plan"}
            />
          ) : (
            <div className="space-y-4">

              {sortedList.map((lift) => (
                <PlanWorkoutCard
                  key={lift.id}
                  lift={lift}
                  isPlan={activeTab === "plan"}
                  onRemove={() => {
                    if (activeTab === "plan") {
                      removeFromPlan(lift.id);
                    } else {
                      removeSavedWorkout(lift.id);
                    }
                  }}
                />
              ))}

            </div>
          )}

        </div>

      </section>
    </main>
  );
};


// =====================================================
// METRIC CARD
// =====================================================

const MetricCard = ({
  title,
  value,
}: {
  title: string;
  value: number;
}) => {
  return (
    <div className="rounded-xl border border-[#252932] bg-[#15171E] p-5">

      <p className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
        {title}
      </p>

      <p className="mt-2 text-3xl font-extrabold text-white">
        {value}
      </p>

    </div>
  );
};


// =====================================================
// PLAN WORKOUT CARD
// =====================================================

const PlanWorkoutCard = ({
  lift,
  isPlan,
  onRemove,
}: {
  lift: ILift;
  isPlan: boolean;
  onRemove: () => void;
}) => {
  return (
    <article className="flex flex-col gap-5 rounded-xl border border-[#252932] bg-[#15171E] p-4 sm:flex-row sm:items-center">

      {/* Workout Image */}
      <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-lg sm:h-28 sm:w-40">

        <Image
          src={lift.image}
          alt={lift.name}
          fill
          sizes="(max-width: 640px) 100vw, 160px"
          className="object-cover"
        />

      </div>

      {/* Workout Information */}
      <div className="min-w-0 flex-1">

        <h3 className="text-lg font-bold uppercase text-white">
          {lift.name}
        </h3>

        <p className="mt-1 text-sm text-[#9CA3AF]">
          {lift.equipment}
        </p>

        {/* Stats */}
        <div className="mt-4 flex flex-wrap items-center gap-5">

          <div className="flex items-center gap-1.5 text-xs text-[#B8BDC7]">
            <Clock3
              size={14}
              className="text-[#CCFF00]"
            />
            {lift.duration} min
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#B8BDC7]">
            <Flame
              size={14}
              className="text-[#CCFF00]"
            />
            {lift.caloriesBurned} kcal
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#B8BDC7]">
            <Star
              size={14}
              className="text-[#CCFF00]"
            />
            {lift.rating}
          </div>

        </div>

      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2 sm:justify-end">

        <Link
          href={`/workout/${lift.id}`}
          className="rounded-md border border-[#363A43] px-4 py-2.5 text-xs font-medium text-[#D1D5DB] transition hover:border-[#CCFF00] hover:text-[#CCFF00]"
        >
          View Details
        </Link>

        {isPlan && (
          <button
            type="button"
            className="rounded-md bg-[#CCFF00] px-4 py-2.5 text-xs font-bold text-black transition hover:bg-[#B3E600]"
          >
            Mark as Done
          </button>
        )}

        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${lift.name}`}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-[#363A43] text-[#9CA3AF] transition hover:border-red-400 hover:text-red-400"
        >
          <X size={15} />
        </button>

      </div>

    </article>
  );
};


// =====================================================
// EMPTY STATE
// =====================================================

const EmptyState = ({
  isPlan,
}: {
  isPlan: boolean;
}) => {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-[#30343D] bg-[#111318] px-6 text-center">

      <h2 className="text-xl font-bold text-white">
        NOTHING HERE YET
      </h2>

      <p className="mt-2 max-w-md text-sm text-[#6B7280]">
        {isPlan
          ? "Browse the library and add a lift to get today moving."
          : "Save a workout from the library to see it here."}
      </p>

      <Link
        href="/#library"
        className="mt-6 rounded-md bg-[#CCFF00] px-5 py-3 text-xs font-bold text-black transition hover:bg-[#B3E600]"
      >
        GO TO WORKOUTS
      </Link>

    </div>
  );
};

export default MyPlanPage;