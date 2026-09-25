"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { ILift } from "@/type/lift.type";

interface WorkoutContextType {
  todaysPlan: ILift[];
  savedWorkouts: ILift[];
  completedWorkouts: number[];

  addToPlan: (lift: ILift) => boolean;
  removeFromPlan: (id: number) => void;

  saveWorkout: (lift: ILift) => boolean;
  removeSavedWorkout: (id: number) => void;

  markAsDone: (id: number) => void;
}

const WorkoutContext = createContext<
  WorkoutContextType | undefined
>(undefined);

export const WorkoutProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [todaysPlan, setTodaysPlan] = useState<ILift[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<ILift[]>([]);
  const [completedWorkouts, setCompletedWorkouts] = useState<
    number[]
  >([]);

  const [isHydrated, setIsHydrated] = useState(false);

  /*
   * Load data from localStorage
   */
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("todaysPlan");
      const storedSaved =
        localStorage.getItem("savedWorkouts");
      const storedCompleted = localStorage.getItem(
        "completedWorkouts"
      );

      if (storedPlan) {
        setTodaysPlan(JSON.parse(storedPlan));
      }

      if (storedSaved) {
        setSavedWorkouts(JSON.parse(storedSaved));
      }

      if (storedCompleted) {
        setCompletedWorkouts(
          JSON.parse(storedCompleted)
        );
      }
    } catch (error) {
      console.error(
        "Failed to load workout data:",
        error
      );
    } finally {
      setIsHydrated(true);
    }
  }, []);

  /*
   * Persist Today's Plan
   */
  useEffect(() => {
    if (!isHydrated) return;

    localStorage.setItem(
      "todaysPlan",
      JSON.stringify(todaysPlan)
    );
  }, [todaysPlan, isHydrated]);

  /*
   * Persist Saved Workouts
   */
  useEffect(() => {
    if (!isHydrated) return;

    localStorage.setItem(
      "savedWorkouts",
      JSON.stringify(savedWorkouts)
    );
  }, [savedWorkouts, isHydrated]);

  /*
   * Persist Completed Workouts
   */
  useEffect(() => {
    if (!isHydrated) return;

    localStorage.setItem(
      "completedWorkouts",
      JSON.stringify(completedWorkouts)
    );
  }, [completedWorkouts, isHydrated]);

  /*
   * Add workout to Today's Plan
   *
   * Maximum = 5 workouts
   */
  const addToPlan = (lift: ILift) => {
    if (todaysPlan.length >= 5) {
      return false;
    }

    const alreadyExists = todaysPlan.some(
      (item) => item.id === lift.id
    );

    if (alreadyExists) {
      return false;
    }

    setTodaysPlan((currentPlan) => [
      ...currentPlan,
      lift,
    ]);

    return true;
  };

  /*
   * Remove workout from Today's Plan
   */
  const removeFromPlan = (id: number) => {
    setTodaysPlan((currentPlan) =>
      currentPlan.filter((item) => item.id !== id)
    );

    // Also remove its completed status
    setCompletedWorkouts((currentCompleted) =>
      currentCompleted.filter(
        (completedId) => completedId !== id
      )
    );
  };

  /*
   * Save workout
   */
  const saveWorkout = (lift: ILift) => {
    const alreadyExists = savedWorkouts.some(
      (item) => item.id === lift.id
    );

    if (alreadyExists) {
      return false;
    }

    setSavedWorkouts((currentSaved) => [
      ...currentSaved,
      lift,
    ]);

    return true;
  };

  /*
   * Remove saved workout
   */
  const removeSavedWorkout = (id: number) => {
    setSavedWorkouts((currentSaved) =>
      currentSaved.filter((item) => item.id !== id)
    );
  };

  /*
   * Mark workout as done
   */
  const markAsDone = (id: number) => {
    setCompletedWorkouts((currentCompleted) => {
      if (currentCompleted.includes(id)) {
        return currentCompleted;
      }

      return [...currentCompleted, id];
    });
  };

  return (
    <WorkoutContext.Provider
      value={{
        todaysPlan,
        savedWorkouts,
        completedWorkouts,
        addToPlan,
        removeFromPlan,
        saveWorkout,
        removeSavedWorkout,
        markAsDone,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error(
      "useWorkout must be used inside WorkoutProvider"
    );
  }

  return context;
};