"use client";

import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { ILift } from "@/type/lift.type";
import LiftCard from "../shared/LiftCard";

interface LibraryClientProps {
  lifts: ILift[];
}

const LibraryClient = ({
  lifts,
}: LibraryClientProps) => {
  const [searchTerm, setSearchTerm] =
    useState("");

  const filteredLifts = useMemo(() => {
    const query = searchTerm
      .trim()
      .toLowerCase();

    if (!query) {
      return lifts;
    }

    return lifts.filter((lift) => {
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
  }, [lifts, searchTerm]);

  return (
    <>
      {/* Header */}
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-wide text-white">
            THE LIBRARY
          </h2>

          <p className="mt-2 text-sm text-[#D1D5DB]">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
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
            className="w-full rounded-md border border-[#363A43] bg-[#15171E] py-3 pl-10 pr-4 text-xs text-white outline-none placeholder:text-[#6B7280] transition focus:border-[#CCFF00]"
          />
        </div>
      </div>

      {/* Results */}
      <div className="mt-8">
        {filteredLifts.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-[#30343D] bg-[#111318] px-6 text-center">
            <Search
              size={28}
              className="text-[#CCFF00]"
            />

            <h3 className="mt-4 text-xl font-bold text-white">
              NO WORKOUTS FOUND
            </h3>

            <p className="mt-2 text-sm text-[#6B7280]">
              Try searching by workout name
              or muscle group.
            </p>

            <button
              type="button"
              onClick={() =>
                setSearchTerm("")
              }
              className="mt-6 rounded-md bg-[#CCFF00] px-5 py-3 text-xs font-bold text-black transition hover:bg-[#B3E600]"
            >
              CLEAR SEARCH
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredLifts.map((lift) => (
              <LiftCard
                key={lift.id}
                lift={lift}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default LibraryClient;