import Image from "next/image";
import { notFound } from "next/navigation";

import { ILift } from "@/type/lift.type";
import WorkoutActions from "./WorkoutActions";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Fetch all workouts and find the requested workout
const getLift = async (id: string): Promise<ILift | null> => {
  const response = await fetch(
    "https://api.abcz.workers.dev/api/fitlog"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  const data: ILift[] = await response.json();

  return data.find((lift) => lift.id === Number(id)) ?? null;
};

const WorkoutDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params;

  const lift = await getLift(id);

  // If workout doesn't exist, show the global 404 page
  if (!lift) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0C0D10] px-4 py-10 sm:px-6 lg:px-8">
      <section className="container mx-auto">

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

          {/* ========================================
              LEFT SIDE - WORKOUT IMAGE
          ========================================= */}
          <div className="relative h-[420px] overflow-hidden rounded-xl sm:h-[500px] lg:h-[560px]">
            <Image
              src={lift.image}
              alt={lift.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* ========================================
              RIGHT SIDE - WORKOUT INFORMATION
          ========================================= */}
          <div>

            {/* Workout Title */}
            <h1 className="text-3xl font-extrabold uppercase leading-tight text-white sm:text-4xl">
              {lift.name}
            </h1>

            {/* Description */}
            <p className="mt-4 text-sm leading-6 text-[#9CA3AF]">
              {lift.description}
            </p>

            {/* Muscle Group Tags */}
            <div className="mt-5 flex flex-wrap gap-2">
              {lift.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full bg-[#CCFF00] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-black"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* ========================================
                KEY SPECS
            ========================================= */}
            <div className="mt-7">
              <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-white">
                Key Specs
              </h2>

              <div className="overflow-hidden rounded-xl border border-[#252932] bg-[#15171E]">

                <SpecRow
                  label="Equipment"
                  value={lift.equipment}
                />

                <SpecRow
                  label="Difficulty"
                  value={lift.difficulty}
                />

                <SpecRow
                  label="Sets"
                  value={String(lift.sets)}
                />

                <SpecRow
                  label="Reps"
                  value={lift.reps}
                />

                <SpecRow
                  label="Duration"
                  value={`${lift.duration} min`}
                />

                <SpecRow
                  label="Calories"
                  value={`${lift.caloriesBurned} kcal`}
                />

                <SpecRow
                  label="Rating"
                  value={String(lift.rating)}
                  last
                />

              </div>
            </div>

            {/* ========================================
                INSTRUCTIONS
            ========================================= */}
            <div className="mt-7">

              <h2 className="text-xs font-bold uppercase tracking-wider text-white">
                Instructions
              </h2>

              <ol className="mt-4 space-y-4">
                {lift.instructions.map(
                  (instruction, index) => (
                    <li
                      key={index}
                      className="flex gap-3 text-sm leading-6 text-[#B8BDC7]"
                    >
                      <span className="shrink-0 font-bold text-[#CCFF00]">
                        {index + 1}.
                      </span>

                      <span>{instruction}</span>
                    </li>
                  )
                )}
              </ol>

            </div>

            {/* ========================================
                ACTION BUTTONS
            ========================================= */}
            <WorkoutActions lift={lift} />

          </div>
        </div>

      </section>
    </main>
  );
};


// ================================================
// SPEC ROW COMPONENT
// ================================================

const SpecRow = ({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) => {
  return (
    <div
      className={`flex items-center justify-between px-4 py-3.5 ${
        !last ? "border-b border-[#252932]" : ""
      }`}
    >
      <span className="text-[9px] font-bold uppercase tracking-wider text-[#7C828D]">
        {label}
      </span>

      <span className="text-right text-xs text-[#E5E7EB]">
        {value}
      </span>
    </div>
  );
};

export default WorkoutDetailsPage;