import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Exercise } from "./WorkoutsContext";

interface Goal {
    label: string;
    goal: number;
    current: number;
    type: string;
    notes: string | undefined;
}

interface UserGoalsContextType {
    userGoals: Goal[];
    addGoal: (goal: Goal) => void;
    updateGoal: (index: number, newCurrent: number) => void;
    deleteGoal: (index: number) => void;
    /** Call this after logging an exercise — automatically bumps matching goal's
     *  `current` value if the new weight beats the existing personal best. */
    syncGoalFromExercise: (exercise: Exercise) => void;
}

export const UserGoalsContext = createContext<UserGoalsContextType | undefined>(undefined);

interface UserGoalsProviderProps {
    children: ReactNode;
    username: string;
}

export const UserGoalsProvider = ({ children, username }: UserGoalsProviderProps) => {
    const storageKey = `${username}:goals`;

    const [userGoals, setUserGoals] = useState<Goal[]>(() => {
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved) : [];
    });

    const persist = (goals: Goal[]) => {
        setUserGoals(goals);
        localStorage.setItem(storageKey, JSON.stringify(goals));
    };

    const addGoal = (goal: Goal) => {
        persist([...userGoals, goal]);
    };

    const updateGoal = (index: number, newCurrent: number) => {
        const updated = [...userGoals];
        updated[index] = { ...updated[index], current: newCurrent };
        persist(updated);
    };

    const deleteGoal = (index: number) => {
        persist(userGoals.filter((_, i) => i !== index));
    };

    const syncGoalFromExercise = (exercise: Exercise) => {
        if (exercise.type !== "Strength") return;

        const exerciseName = exercise.name.trim().toLowerCase();
        const newWeight = exercise.weight;

        const updated = userGoals.map((goal) => {
            if (goal.label.trim().toLowerCase() === exerciseName && newWeight > goal.current) {
                return { ...goal, current: Math.min(newWeight, goal.goal) };
            }
            return goal;
        });

        if (updated.some((g, i) => g.current !== userGoals[i].current)) {
            persist(updated);
        }
    };

    return (
        <UserGoalsContext.Provider value={{ userGoals, addGoal, updateGoal, deleteGoal, syncGoalFromExercise }}>
            {children}
        </UserGoalsContext.Provider>
    );
};

export const useUserGoals = () => {
    const context = useContext(UserGoalsContext);
    if (!context) {
        throw new Error("useUserGoals must be used within UserGoalsProvider");
    }
    return context;
};