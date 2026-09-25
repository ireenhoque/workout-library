"use client";

import React, {
  useMemo,
  useState,
} from "react";

import Link from "next/link";
import Image from "next/image";

import {
  Check,
  ChevronDown,
  Clock3,
  Flame,
  Search,
  Star,
  X,
} from "lucide-react";

import toast from "react-hot-toast";

import { ILift } from "@/type/lift.type";
import { useWorkout } from "@/context/WorkoutContext";

type ActiveTab = "plan" | "saved";

type SortOption =
  | "duration"
  | "calories"
  | "rating";

const MyPlanPage = () => {
  const {
    todaysPlan,
    savedWorkouts,
    removeFromPlan,
    removeSavedWorkout,
    completedWorkouts,
    markAsDone,
  } = useWorkout();

  const [activeTab, setActiveTab] =
    useState<ActiveTab>("plan");

  const [sortBy, setSortBy] =
    useState<SortOption>("duration");

  const [searchTerm, setSearchTerm] =
    useState("");

  /*
   * Current tab data
   */
  const currentList =
    activeTab === "plan"
      ? todaysPlan
      : savedWorkouts;

  /*
   * Search by:
   *
   * 1. Workout name
   * 2. Muscle group/tag
   */
  const filteredList = useMemo(() => {
    const query = searchTerm
      .trim()
      .toLowerCase();

    if (!query) {
      return currentList;
    }

    return currentList.filter((lift) => {
      const matchesName =
        lift.name
          .toLowerCase()
          .includes(query);

      const matchesTag =
        lift.muscleGroups.some((muscle) =>
          muscle
            .toLowerCase()
            .includes(query)
        );

      return matchesName || matchesTag;
    });
  }, [currentList, searchTerm]);

  /*
   * Sort filtered results
   */
  const sortedList = useMemo(() => {
    const sorted = [...filteredList];

    if (sortBy === "duration") {
      sorted.sort(
        (a, b) =>
          a.duration - b.duration
      );
    }

    if (sortBy === "calories") {
      sorted.sort(
        (a, b) =>
          a.caloriesBurned -
          b.caloriesBurned
      );
    }

    if (sortBy === "rating") {
      sorted.sort(
        (a, b) =>
          b.rating - a.rating
      );
    }

    return sorted;
  }, [filteredList, sortBy]);

  /*
   * Today's Plan metrics
   */
  const totalMinutes = useMemo(() => {
    return todaysPlan.reduce(
      (total, lift) =>
        total + lift.duration,
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

  /*
   * Mark as done
   */
  const handleMarkAsDone = (
    id: number
  ) => {
    if (
      completedWorkouts.includes(id)
    ) {
      toast.error(
        "Workout is already marked as done."
      );
      return;
    }

    markAsDone(id);

    toast.success(
      "Workout marked as done."
    );
  };

  /*
   * Remove workout
   */
  const handleRemove = (
    lift: ILift
  ) => {
    if (activeTab === "plan") {
      removeFromPlan(lift.id);

      toast.success(
        `${lift.name} removed from today's plan.`
      );
    } else {
      removeSavedWorkout(lift.id);

      toast.success(
        `${lift.name} removed from saved workouts.`
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#0C0D10] px-4 py-10 sm:px-6 lg:px-8">
      <section className="container mx-auto">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            MY PLAN
          </h1>

          <p className="mt-2 text-sm text-[#9CA3AF]">
            Cap of five lifts for today. Finish them,
            then load more.
          </p>
        </div>

        {/* Metrics */}
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

        {/* Tabs */}
        <div className="mt-8 border-b border-[#252932]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

            {/* Tab Buttons */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("plan");
                  setSearchTerm("");
                }}
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
                onClick={() => {
                  setActiveTab("saved");
                  setSearchTerm("");
                }}
                className={`px-5 py-3 text-xs font-bold transition ${
                  activeTab === "saved"
                    ? "border-b-2 border-[#CCFF00] text-[#CCFF00]"
                    : "text-[#6B7280] hover:text-white"
                }`}
              >
                SAVED
              </button>
            </div>

            {/* Search + Sort */}
            <div className="flex w-full flex-col gap-3 pb-3 sm:flex-row lg:w-auto">

              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]"
                />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(
                      event.target.value
                    )
                  }
                  placeholder="Search workout or tag..."
                  className="w-full rounded-md border border-[#363A43] bg-[#15171E] py-3 pl-10 pr-4 text-xs text-white outline-none placeholder:text-[#6B7280] focus:border-[#CCFF00]"
                />
              </div>

              {/* Sort */}
              <div className="relative w-full sm:w-44">
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
          </div>
        </div>

        {/* Workout List */}
        <div className="mt-6">

          {/* Search produced no result */}
          {currentList.length > 0 &&
          sortedList.length === 0 ? (
            <SearchEmptyState
              searchTerm={searchTerm}
              onClear={() =>
                setSearchTerm("")
              }
            />
          ) : sortedList.length === 0 ? (
            <EmptyState
              isPlan={
                activeTab === "plan"
              }
            />
          ) : (
            <div className="space-y-4">
              {sortedList.map((lift) => (
                <PlanWorkoutCard
                  key={lift.id}
                  lift={lift}
                  isPlan={
                    activeTab === "plan"
                  }
                  isCompleted={completedWorkouts.includes(
                    lift.id
                  )}
                  onMarkAsDone={() =>
                    handleMarkAsDone(
                      lift.id
                    )
                  }
                  onRemove={() =>
                    handleRemove(lift)
                  }
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

/*
 * Metric Card
 */
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

/*
 * Workout Card
 */
const PlanWorkoutCard = ({
  lift,
  isPlan,
  isCompleted,
  onMarkAsDone,
  onRemove,
}: {
  lift: ILift;
  isPlan: boolean;
  isCompleted: boolean;
  onMarkAsDone: () => void;
  onRemove: () => void;
}) => {
  return (
    <article
      className={`flex flex-col gap-5 rounded-xl border bg-[#15171E] p-4 transition sm:flex-row sm:items-center ${
        isCompleted
          ? "border-[#CCFF00]/40 opacity-75"
          : "border-[#252932]"
      }`}
    >
      {/* Image */}
      <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-lg sm:h-28 sm:w-40">
        <Image
          src={lift.image}
          alt={lift.name}
          fill
          sizes="(max-width: 640px) 100vw, 160px"
          className={`object-cover ${
            isCompleted
              ? "grayscale"
              : ""
          }`}
        />
      </div>

      {/* Information */}
      <div className="min-w-0 flex-1">

        <div className="flex flex-wrap items-center gap-3">
          <h3
            className={`text-lg font-bold uppercase ${
              isCompleted
                ? "text-[#9CA3AF] line-through"
                : "text-white"
            }`}
          >
            {lift.name}
          </h3>

          {isCompleted && (
            <span className="rounded-full bg-[#CCFF00]/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-[#CCFF00]">
              Completed
            </span>
          )}
        </div>

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

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-2">
          {lift.muscleGroups.map(
            (muscle) => (
              <span
                key={muscle}
                className="rounded-full border border-[#363A43] px-2 py-1 text-[9px] font-medium uppercase tracking-wide text-[#7C828D]"
              >
                {muscle}
              </span>
            )
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2 sm:justify-end">

        {/* View Details */}
        <Link
          href={`/workout/${lift.id}`}
          className="rounded-md border border-[#363A43] px-4 py-2.5 text-xs font-medium text-[#D1D5DB] transition hover:border-[#CCFF00] hover:text-[#CCFF00]"
        >
          View Details
        </Link>

        {/* Mark as Done */}
        {isPlan && (
          <button
            type="button"
            onClick={onMarkAsDone}
            disabled={isCompleted}
            className={`flex items-center gap-2 rounded-md px-4 py-2.5 text-xs font-bold transition ${
              isCompleted
                ? "cursor-not-allowed bg-[#31351E] text-[#7E8A43]"
                : "bg-[#CCFF00] text-black hover:bg-[#B3E600]"
            }`}
          >
            <Check size={15} />

            {isCompleted
              ? "Done"
              : "Mark as Done"}
          </button>
        )}

        {/* Remove */}
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

/*
 * Empty state
 */
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

/*
 * Search empty state
 */
const SearchEmptyState = ({
  searchTerm,
  onClear,
}: {
  searchTerm: string;
  onClear: () => void;
}) => {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-[#30343D] bg-[#111318] px-6 text-center">

      <Search
        size={28}
        className="text-[#CCFF00]"
      />

      <h2 className="mt-4 text-xl font-bold text-white">
        NO WORKOUTS FOUND
      </h2>

      <p className="mt-2 max-w-md text-sm text-[#6B7280]">
        No workout matches{" "}
        <span className="font-semibold text-[#D1D5DB]">
          "{searchTerm}"
        </span>
        .
      </p>

      <button
        type="button"
        onClick={onClear}
        className="mt-6 rounded-md bg-[#CCFF00] px-5 py-3 text-xs font-bold text-black transition hover:bg-[#B3E600]"
      >
        CLEAR SEARCH
      </button>
    </div>
  );
};

export default MyPlanPage;