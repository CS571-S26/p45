import { createContext, useState } from "react";
import type { ReactNode } from "react";

interface Goal {
    label: string;
    goal: number;
    current: number;
}

interface UserGoalsContextType {
    userGoals: Goal[];
    addGoal: (goal: Goal) => void;
    updateGoal: (index: number, updatedGoal: Goal) => void;
    deleteGoal: (index: number) => void;
}

export const UserGoalsContext = createContext<UserGoalsContextType | undefined>(undefined);

export const UserGoalsProvider = ({ children }: { children: ReactNode }) => {
    const [userGoals, setUserGoals] = useState<Goal[]>([]);

    const addGoal = (goal: Goal) => {
        setUserGoals([...userGoals, goal]);
    };

    const updateGoal = (index: number, updatedGoal: Goal) => {
        const newGoals = [...userGoals];
        newGoals[index] = updatedGoal;
        setUserGoals(newGoals);
    };

    const deleteGoal = (index: number) => {
        setUserGoals(userGoals.filter((_, i) => i !== index));
    };

    return (
        <UserGoalsContext.Provider value={{ userGoals, addGoal, updateGoal, deleteGoal }}>
            {children}
        </UserGoalsContext.Provider>
    );
};