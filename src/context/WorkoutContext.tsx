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

    addToPlan: (lift: ILift) => boolean;
    removeFromPlan: (id: number) => void;

    saveWorkout: (lift: ILift) => boolean;
    removeSavedWorkout: (id: number) => void;
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

    const [isHydrated, setIsHydrated] = useState(false);

    // Load saved data from localStorage
    useEffect(() => {
        try {
            const storedPlan = localStorage.getItem("todaysPlan");
            const storedSaved = localStorage.getItem("savedWorkouts");

            if (storedPlan) {
                setTodaysPlan(JSON.parse(storedPlan));
            }

            if (storedSaved) {
                setSavedWorkouts(JSON.parse(storedSaved));
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

    // Save Today's Plan
    useEffect(() => {
        if (!isHydrated) return;

        localStorage.setItem(
            "todaysPlan",
            JSON.stringify(todaysPlan)
        );
    }, [todaysPlan, isHydrated]);

    // Save Saved Workouts
    useEffect(() => {
        if (!isHydrated) return;

        localStorage.setItem(
            "savedWorkouts",
            JSON.stringify(savedWorkouts)
        );
    }, [savedWorkouts, isHydrated]);

    // Add workout to Today's Plan
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

    // Remove workout from Today's Plan
    const removeFromPlan = (id: number) => {
        setTodaysPlan((currentPlan) =>
            currentPlan.filter((item) => item.id !== id)
        );
    };

    // Save workout
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

    // Remove saved workout
    const removeSavedWorkout = (id: number) => {
        setSavedWorkouts((currentSaved) =>
            currentSaved.filter((item) => item.id !== id)
        );
    };

    return (
        <WorkoutContext.Provider
            value={{
                todaysPlan,
                savedWorkouts,
                addToPlan,
                removeFromPlan,
                saveWorkout,
                removeSavedWorkout,
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