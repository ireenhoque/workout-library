import React from "react";

import { ILift } from "@/type/lift.type";
import LibraryClient from "./LibraryClient";

const getAllLifts = async (): Promise<ILift[]> => {
  const response = await fetch(
    "https://api.abcz.workers.dev/api/fitlog"
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch workouts"
    );
  }

  const data: ILift[] =
    await response.json();

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
        <LibraryClient lifts={data} />
      </div>
    </section>
  );
};

export default LibrarySection;