import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Card, CardHeader, CardBody, CardFooter, Button } from "react-bootstrap";
import { useState, useContext } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { WorkoutsContext } from "../../contexts/WorkoutsContext";
import type { WorkoutType } from "../../contexts/WorkoutsContext";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const WORKOUT_TYPES: { label: WorkoutType; color: string }[] = [
    { label: "Strength",    color: "#4CAF50" },
    { label: "Cardio",      color: "#FF9800" },
    { label: "Flexibility", color: "#2196F3" },
];

const typeColor = (type: WorkoutType) =>
    WORKOUT_TYPES.find((t) => t.label === type)?.color ?? "#888";

const Calendar = () => {
    const today = new Date();
    const nav = useNavigate();
    const workoutsContext = useContext(WorkoutsContext);
    const workouts = workoutsContext?.workouts ?? {};

    const [showLogButton, setShowLogButton] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState<number | null>(null);

    const changeMonth = (offset: number) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + offset);
        setCurrentDate(newDate);
        setSelectedDay(null);
        setShowLogButton(false);
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();

    const isCurrentMonth =
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear();

    const toDateKey = (day: number) => {
        const mm = String(month + 1).padStart(2, "0");
        const dd = String(day).padStart(2, "0");
        return `${year}-${mm}-${dd}`;
    };

    const handleDayClick = (day: number) => {
        setSelectedDay(day);
        setShowLogButton(true);
    };

    const cells: (number | null)[] = [
        ...Array(firstDayOfWeek).fill(null),
        ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];
    while (cells.length % 7 !== 0) cells.push(null);

    return (
        <Card className="calander-card">
            <CardHeader className="card-header">
                <FaChevronLeft className="clickable" onClick={() => changeMonth(-1)} />
                <p className="month-text no-select">
                    {currentDate.toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                    })}
                </p>
                <FaChevronRight className="clickable" onClick={() => changeMonth(1)} />
            </CardHeader>

            <CardBody>
                <div className="days-grid">
                    {DAY_LABELS.map((label) => (
                        <div key={label} className="dow-label">{label}</div>
                    ))}

                    {cells.map((day, i) => {
                        if (day === null) {
                            return <div key={`blank-${i}`} className="day-cell day-cell--blank" />;
                        }

                        const dateKey = toDateKey(day);
                        const exercises = workouts[dateKey] ?? [];
                        const isToday = isCurrentMonth && day === today.getDate();
                        // Selected takes priority visually; today is always blue unless
                        // another day is selected (in which case today still shows blue,
                        // just without the "selected" bold ring).
                        const isSelected = day === selectedDay;

                        const typesPresent = WORKOUT_TYPES
                            .map((t) => t.label)
                            .filter((t) => exercises.some((ex) => ex.type === t));

                        return (
                            <div
                                key={dateKey}
                                className={[
                                    "day-cell",
                                    isToday ? "today" : "",
                                    isSelected ? "selected" : "",
                                    typesPresent.length > 0 ? "has-workout" : "",
                                ].filter(Boolean).join(" ")}
                                onClick={() => handleDayClick(day)}
                                title={
                                    typesPresent.length > 0
                                        ? `${exercises.length} exercise${exercises.length !== 1 ? "s" : ""}: ${typesPresent.join(", ")}`
                                        : undefined
                                }
                            >
                                <span className="day-number">{day}</span>
                                {typesPresent.length > 0 && (
                                    <div className="day-dots">
                                        {typesPresent.map((type) => (
                                            <span
                                                key={type}
                                                className="workout-dot"
                                                style={{ backgroundColor: typeColor(type) }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {showLogButton && selectedDay !== null && (
                    <Button
                        className="btn-primary"
                        onClick={() => nav(`/log-workout?date=${toDateKey(selectedDay)}`)}
                    >
                        Log Workout
                    </Button>
                )}
            </CardBody>

            <hr />

            <CardFooter className="calendar-footer">
                <div className="legend-container">
                    {WORKOUT_TYPES.map(({ label, color }) => (
                        <div key={label} className="legend-item">
                            <div className="status-circle" style={{ backgroundColor: color }} />
                            <p className="legend-label">{label}</p>
                        </div>
                    ))}
                </div>
            </CardFooter>
        </Card>
    );
};

export default Calendar;