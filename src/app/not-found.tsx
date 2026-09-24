import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#0C0D10] px-6">
      <div className="text-center">

        <p className="text-sm font-bold tracking-[4px] text-[#CCFF00]">
          FITLOG
        </p>

        <h1 className="mt-5 text-7xl font-black text-white sm:text-9xl">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold uppercase text-white">
          Workout Not Found
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#9CA3AF]">
          The page you are looking for does not exist or may have been
          moved.
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex rounded-md bg-[#CCFF00] px-6 py-3 text-xs font-bold text-black transition hover:bg-[#B3E600]"
        >
          BACK TO HOME
        </Link>

      </div>
    </main>
  );
};

export default NotFound;