import Image from "next/image";
import { ILift } from "@/type/lift.type";
import WorkoutActions from "./WorkoutActions";

interface WorkoutDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}

const getLift = async (id: string): Promise<ILift | null> => {
    const response = await fetch(
        "https://api.abcz.workers.dev/api/fitlog"
    );

    if (!response.ok) {
        throw new Error("Failed to fetch workouts");
    }

    const data: ILift[] = await response.json();

    const lift = data.find(
        (item) => item.id === Number(id)
    );

    return lift ?? null;
};

const WorkoutDetailsPage = async ({
    params,
}: WorkoutDetailsPageProps) => {
    const { id } = await params;

    const lift = await getLift(id);

    if (!lift) {
        return (
            <main className="flex min-h-[70vh] items-center justify-center bg-[#0C0D10]">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white">
                        Workout Not Found
                    </h1>

                    <p className="mt-3 text-sm text-[#9CA3AF]">
                        The requested workout could not be found.
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="bg-[#0C0D10] px-4 py-8 sm:px-6 lg:px-8">
            <section className="container mx-auto">

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">

                    {/* =================================
                        LEFT — WORKOUT IMAGE
                    ================================== */}
                    <div className="relative h-[420px] overflow-hidden rounded-xl border border-[#252932] sm:h-[520px] lg:h-[560px]">
                        <Image
                            src={lift.image}
                            alt={lift.name}
                            fill
                            priority
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                        />
                    </div>


                    {/* =================================
                        RIGHT — WORKOUT INFORMATION
                    ================================== */}
                    <div>

                        {/* Title */}
                        <h1 className="text-3xl font-extrabold uppercase leading-tight tracking-tight text-white sm:text-4xl">
                            {lift.name}
                        </h1>

                        {/* Description */}
                        <p className="mt-3 max-w-xl text-sm leading-6 text-[#9CA3AF]">
                            {lift.description}
                        </p>


                        {/* Category Tags */}
                        <div className="mt-4 flex flex-wrap gap-2">
                            {lift.muscleGroups.map((muscle) => (
                                <span
                                    key={muscle}
                                    className="rounded-full bg-[#CCFF00] px-3 py-1 text-[10px] font-bold uppercase text-black"
                                >
                                    {muscle}
                                </span>
                            ))}
                        </div>


                        {/* =================================
                            KEY SPECS
                        ================================== */}
                        <div className="mt-5 overflow-hidden rounded-xl border border-[#252932] bg-[#15171E]">

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


                        {/* =================================
                            INSTRUCTIONS
                        ================================== */}
                        <div className="mt-6">
                            <h2 className="text-xs font-bold uppercase tracking-wide text-white">
                                Instructions
                            </h2>

                            <ol className="mt-4 space-y-3">
                                {lift.instructions.map(
                                    (instruction, index) => (
                                        <li
                                            key={index}
                                            className="flex gap-3 text-xs leading-5 text-[#B8BDC7]"
                                        >
                                            <span className="min-w-4 text-[#7C828D]">
                                                {index + 1}.
                                            </span>

                                            <span>
                                                {instruction}
                                            </span>
                                        </li>
                                    )
                                )}
                            </ol>
                        </div>


                        {/* =================================
                            ACTION BUTTONS
                        ================================== */}
                        <WorkoutActions lift={lift} />

                    </div>
                </div>

            </section>
        </main>
    );
};


/* =================================
   SPECIFICATION ROW
================================== */

interface SpecRowProps {
    label: string;
    value: string;
    last?: boolean;
}

const SpecRow = ({
    label,
    value,
    last = false,
}: SpecRowProps) => {
    return (
        <div
            className={`flex items-center justify-between px-4 py-3.5 ${
                !last ? "border-b border-[#252932]" : ""
            }`}
        >
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#7C828D]">
                {label}
            </span>

            <span className="text-xs text-[#E5E7EB]">
                {value}
            </span>
        </div>
    );
};

export default WorkoutDetailsPage;