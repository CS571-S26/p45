import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserGoals } from "../contexts/UserGoalsContext";
import type { WorkoutType } from "../contexts/WorkoutsContext";
import "./UserGoalsPageStyles.css";

const WORKOUT_TYPES: { label: WorkoutType; color: string }[] = [
    { label: "Strength",    color: "#4CAF50" },
    { label: "Cardio",      color: "#FF9800" },
    { label: "Flexibility", color: "#2196F3" },
];

const UserGoalsPage = () => {
    const [selectedType, setSelectedType] = useState<WorkoutType>("Strength");
    const [workout, setWorkout] = useState("");
    const [currentWeight, setCurrentWeight] = useState("");
    const [goalWeight, setGoalWeight] = useState("");
    const [notes, setNotes] = useState("");
    const navigate = useNavigate();
    const { addGoal } = useUserGoals();

    const resetFields = () => {
        setWorkout("");
        setCurrentWeight("");
        setGoalWeight("");
        setNotes("");
    };

    const handleTypeChange = (t: WorkoutType) => {
        setSelectedType(t);
        resetFields();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!workout.trim()) {
            alert("Enter a valid exercise name");
            return;
        }

        if (selectedType === "Flexibility") {
            addGoal({ 
                label: workout.trim(), 
                type: selectedType, 
                current: 0, 
                goal: 0,
                notes: notes.trim() 
            });
        } else {
            const current = parseFloat(currentWeight);
            const goal = parseFloat(goalWeight);

            if (isNaN(current) || current <= 0 || isNaN(goal) || goal <= 0) {
                alert("Weights must be positive");
                return;
            }
            if (goal <= current) {
                alert("Goal weight must be greater than current weight");
                return;
            }

            addGoal({ 
                label: workout.trim(), 
                type: selectedType, 
                current, 
                goal,
                notes: undefined 
            });
        }

        resetFields();
        setSelectedType("Strength");
        navigate("/");
    };

    return (
        <div className="page-container">
            <div className="userGoalsContainer">
                <button className="userGoalsBackBtn" onClick={() => navigate("/")}>← Back</button>

                <div className="userGoalsHeader">
                    <h2>Set Your Goals</h2>
                    <p className="userGoalsSubtitle">Define your fitness targets by category</p>
                </div>

                <div className="userGoalsFormCard">
                    <form className="userGoalsForm" onSubmit={handleSubmit}>
                        {/* Type selector */}
                        <div className="userGoalsField">
                            <label>Goal Category</label>
                            <div className="userGoalsTypeRow">
                                {WORKOUT_TYPES.map(({ label, color }) => (
                                    <button
                                        key={label}
                                        type="button"
                                        className={[
                                            "userGoalsTypeBtn",
                                            selectedType === label ? "userGoalsTypeBtn--active" : "",
                                        ].filter(Boolean).join(" ")}
                                        style={{ "--type-color": color } as React.CSSProperties}
                                        onClick={() => handleTypeChange(label)}
                                    >
                                        <span className="userGoalsTypeDot" style={{ backgroundColor: color }} />
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Exercise name */}
                        <div className="userGoalsField">
                            <label>Exercise</label>
                            <input
                                type="text"
                                placeholder={
                                    selectedType === "Strength"    ? "e.g. Bench Press" :
                                    selectedType === "Cardio"      ? "e.g. Running" :
                                                                     "e.g. Hamstring Stretch"
                                }
                                value={workout}
                                onChange={(e) => setWorkout(e.target.value)}
                            />
                        </div>

                        {/* Strength & Cardio: Weight/Distance inputs */}
                        {(selectedType === "Strength" || selectedType === "Cardio") && (
                            <div className="userGoalsFormRow">
                                <div className="userGoalsField">
                                    <label>Current {selectedType === "Cardio" ? "Distance" : "Weight"} {selectedType === "Cardio" ? "(mi)" : "(lbs)"}</label>
                                    <input
                                        type="number"
                                        min="0"
                                        step={selectedType === "Cardio" ? "0.01" : "0.5"}
                                        placeholder="0"
                                        value={currentWeight}
                                        onChange={(e) => setCurrentWeight(e.target.value)}
                                    />
                                </div>

                                <div className="userGoalsField">
                                    <label>Goal {selectedType === "Cardio" ? "Distance" : "Weight"} {selectedType === "Cardio" ? "(mi)" : "(lbs)"}</label>
                                    <input
                                        type="number"
                                        min="0"
                                        step={selectedType === "Cardio" ? "0.01" : "0.5"}
                                        placeholder="0"
                                        value={goalWeight}
                                        onChange={(e) => setGoalWeight(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Flexibility: Notes */}
                        {selectedType === "Flexibility" && (
                            <div className="userGoalsField">
                                <label>Notes (optional)</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Target areas, stretches to focus on"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </div>
                        )}

                        <button type="submit" className="userGoalsSubmitBtn">Set Goal</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserGoalsPage;