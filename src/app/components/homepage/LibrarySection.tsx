import React from "react";

import { ILift } from "@/type/lift.type";
import LiftCard from "../shared/LiftCard";

const getAllLifts = async (): Promise<ILift[]> => {
  const response = await fetch(
    "https://api.abcz.workers.dev/api/fitlog"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  const data: ILift[] = await response.json();

  return data;
};

const LibrarySection = async () => {
  const data = await getAllLifts();

  return (
    <section
      id="library"
      className="bg-[#0C0D10] px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto">

        {/* Library Heading */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-wide text-white">
            THE LIBRARY
          </h2>

          <p className="mt-2 text-sm text-[#D1D5DB]">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Workout Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((lift) => (
            <LiftCard
              key={lift.id}
              lift={lift}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default LibrarySection;