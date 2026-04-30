import React, { useState } from "react";
import { Card, CardHeader, CardBody, Button } from "react-bootstrap";
import { useUserGoals } from "../../contexts/UserGoalsContext";
import type { WorkoutType } from "../../contexts/WorkoutsContext";
import "./Dashboard.css";

const WORKOUT_TYPES: WorkoutType[] = ["Strength", "Cardio", "Flexibility"];

const TYPE_COLORS: { [key in WorkoutType]: string } = {
    "Strength": "#4CAF50",
    "Cardio": "#FF9800",
    "Flexibility": "#2196F3",
};

const UserGoalsCard = () => {
    const { userGoals, deleteGoal, updateGoal } = useUserGoals();
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editValue, setEditValue] = useState("");

    const handleEditClick = (index: number, currentValue: number) => {
        setEditingIndex(index);
        setEditValue(currentValue.toString());
    };

    const handleSaveEdit = (index: number) => {
        const newValue = parseFloat(editValue);
        if (!isNaN(newValue) && newValue >= 0) {
            updateGoal(index, newValue);
            setEditingIndex(null);
            setEditValue("");
        } else {
            alert("Please enter a valid number");
        }
    };

    const handleCancel = () => {
        setEditingIndex(null);
        setEditValue("");
    };

    // Group goals by type
    const goalsByType = WORKOUT_TYPES.reduce((acc, type) => {
        acc[type] = userGoals.filter((goal) => goal.type === type);
        return acc;
    }, {} as { [key in WorkoutType]: typeof userGoals });

    return (
        <>
            <Card className="user-goals-card">
                <CardHeader className="goals-card-header">
                    <p className="goals-title">Your Progress</p>
                </CardHeader>
                <CardBody className="goals-card-body">
                    {userGoals.length === 0 ? (
                        <p className="no-goals-message">No goals yet. Add one to get started!</p>
                    ) : (
                        WORKOUT_TYPES.map((type) => {
                            const goalsOfType = goalsByType[type];
                            if (goalsOfType.length === 0) return null;

                            return (
                                <div key={type} className="goals-type-group">
                                    <h4 className="goals-type-header" style={{ "--type-color": TYPE_COLORS[type] } as React.CSSProperties}>
                                        <span className="type-dot" style={{ backgroundColor: TYPE_COLORS[type] }} />
                                        {type}
                                    </h4>
                                    {goalsOfType.map((goal, index) => {
                                        const progress = goal.type === "Flexibility" ? 100 : (goal.current / goal.goal) * 100;
                                        const globalIndex = userGoals.indexOf(goal);

                                        return (
                                            <div key={index} className="goal-item">
                                                <div className="goal-label-row">
                                                    <span className="goal-label">{goal.label}</span>
                                                    {goal.type !== "Flexibility" && (
                                                        <div className="goal-numbers-container">
                                                            {editingIndex === globalIndex ? (
                                                                <div className="edit-container">
                                                                    <input
                                                                        type="number"
                                                                        min="0"
                                                                        step="0.1"
                                                                        value={editValue}
                                                                        onChange={(e) => setEditValue(e.target.value)}
                                                                        className="edit-input"
                                                                        autoFocus
                                                                    />
                                                                    <span className="goal-divider"> / {goal.goal}</span>
                                                                    <button className="edit-save-btn" onClick={() => handleSaveEdit(globalIndex)}>✓</button>
                                                                    <button className="edit-cancel-btn" onClick={handleCancel}>✕</button>
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    <span className="goal-numbers" onClick={() => handleEditClick(globalIndex, goal.current)}>
                                                                        {goal.current} / {goal.goal}
                                                                    </span>
                                                                    <button className="edit-btn" onClick={() => handleEditClick(globalIndex, goal.current)}>Edit</button>
                                                                </>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                                {goal.type !== "Flexibility" && (
                                                    <div className="progress-bar-container">
                                                        <div
                                                            className="progress-bar-fill"
                                                            style={{ width: `${Math.min(progress, 100)}%` }}
                                                        ></div>
                                                    </div>
                                                )}
                                                {goal.notes && (
                                                    <p className="goal-notes">{goal.notes}</p>
                                                )}
                                                <Button className="btn-remove" onClick={() => deleteGoal(globalIndex)}>Remove Goal</Button>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })
                    )}
                </CardBody>
            </Card>
        </>
    );
};

export default UserGoalsCard;