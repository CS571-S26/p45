import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export interface Exercise {
    name: string;
    weight: number;
    reps: number;
}

export type Workouts = Record<string, Exercise[]>;

interface WorkoutsContextType {
    workouts: Workouts;
    addExercise: (date: string, exercise: Exercise) => void;
    deleteExercise: (date: string, exerciseIndex: number) => void;
    getWorkoutByDate: (date: string) => Exercise[];
}

export const WorkoutsContext = createContext<WorkoutsContextType | undefined>(undefined);

export const WorkoutsProvider = ({ children }: { children: ReactNode }) => {
    const [workouts, setWorkouts] = useState<Workouts>(() => {
        const saved = localStorage.getItem("userWorkouts");
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        localStorage.setItem("userWorkouts", JSON.stringify(workouts));
    }, [workouts]);

    const addExercise = (date: string, exercise: Exercise) => {
        setWorkouts((prev) => {
            const dayWorkouts = prev[date] ? [...prev[date]] : [];
            return {
                ...prev,
                [date]: [...dayWorkouts, exercise],
            };
        });
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

    const getWorkoutByDate = (date: string) => {
        return workouts[date] || [];
    };

    return (
        <WorkoutsContext.Provider value={{ workouts, addExercise, deleteExercise, getWorkoutByDate }}>
            {children}
        </WorkoutsContext.Provider>
    );
};