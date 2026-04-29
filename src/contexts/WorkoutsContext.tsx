import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export type WorkoutType = "Strength" | "Cardio" | "Flexibility";

export type Exercise =
    | { type: "Strength";    name: string; weight: number; reps: number; }
    | { type: "Cardio";      name: string; distance: number; duration: number; }
    | { type: "Flexibility"; name: string; duration: number; notes: string; };

export type Workouts = Record<string, Exercise[]>;

interface WorkoutsContextType {
    workouts: Workouts;
    addExercise: (date: string, exercise: Exercise) => void;
    deleteExercise: (date: string, exerciseIndex: number) => void;
    getWorkoutByDate: (date: string) => Exercise[];
}

export const WorkoutsContext = createContext<WorkoutsContextType | undefined>(undefined);

interface WorkoutsProviderProps {
    children: ReactNode;
    username: string;
    /** Optional callback fired after every successful addExercise call.
     *  UserGoalsContext uses this to auto-update goal progress. */
    onExerciseAdded?: (exercise: Exercise) => void;
}

export const WorkoutsProvider = ({ children, username, onExerciseAdded }: WorkoutsProviderProps) => {
    const storageKey = `${username}:workouts`;

    const [workouts, setWorkouts] = useState<Workouts>(() => {
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(workouts));
    }, [workouts, storageKey]);

    const addExercise = (date: string, exercise: Exercise) => {
        setWorkouts((prev) => {
            const dayWorkouts = prev[date] ? [...prev[date]] : [];
            return { ...prev, [date]: [...dayWorkouts, exercise] };
        });
        // Notify listeners (e.g. goals context) about the new exercise
        onExerciseAdded?.(exercise);
    };

    const deleteExercise = (date: string, exerciseIndex: number) => {
        setWorkouts((prev) => {
            if (!prev[date]) return prev;
            const updatedDay = prev[date].filter((_, i) => i !== exerciseIndex);
            const newWorkouts = { ...prev };
            if (updatedDay.length === 0) {
                delete newWorkouts[date];
            } else {
                newWorkouts[date] = updatedDay;
            }
            return newWorkouts;
        });
    };

    const getWorkoutByDate = (date: string) => workouts[date] || [];

    return (
        <WorkoutsContext.Provider value={{ workouts, addExercise, deleteExercise, getWorkoutByDate }}>
            {children}
        </WorkoutsContext.Provider>
    );
};