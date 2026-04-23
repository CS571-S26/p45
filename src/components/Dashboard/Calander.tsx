import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Card, CardHeader, CardBody, CardFooter } from "react-bootstrap";
import { useState/*, useContext*/ } from "react";
//import { WorkoutsContext } from "../../contexts/WorkoutsContext";
import "./Dashboard.css";

const Calendar = () => {
    // const context = useContext(WorkoutsContext);
        
    //     if (!context) {
    //         throw new Error("UserGoalsCard must be used within UserGoalsProvider");
    //     }
        
    //     const { addExercise, getWorkoutByDate } = context;

    const today = new Date();

    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const workoutTypes = [
                        { label: "Strength", color: "#4CAF50" },
                        { label: "Cardio", color: "#FF9800" },
                        { label: "Flexibility", color: "#2196F3" }
                    ];

    const changeMonth = (offset: number) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + offset);
        setCurrentDate(newDate);
    };

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        return Array.from({ length: daysInMonth }, (_, i) => i + 1);
    };

    const days = getDaysInMonth(currentDate);

    // Check if viewing current real month
    const isCurrentMonth =
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear();

    return (
        <Card className="calander-card">
            <CardHeader className="card-header">
                <FaChevronLeft
                    className="clickable"
                    onClick={() => changeMonth(-1)}
                />
                <p className="month-text no-select">
                    {currentDate.toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                    })}
                </p>
                <FaChevronRight
                    className="clickable"
                    onClick={() => changeMonth(1)}
                />
            </CardHeader>

            <CardBody>
                <div className="days-grid">
                    {days.map((day) => {
                        const isToday =
                            isCurrentMonth && day === today.getDate();

                        const isSelected = day === selectedDay;

                        return (
                            <div
                                key={day}
                                className={`day-cell 
                                    ${isToday ? "today" : ""} 
                                    ${isSelected ? "selected" : ""}
                                `}
                                onClick={() => setSelectedDay(day)}
                            >
                                {day}
                            </div>
                        );
                    })}
                </div>
            </CardBody>
            <hr />
            <CardFooter className="calendar-footer">
                <div className="legend-container">
                    {workoutTypes.map((item, index) => (
                        <div key={index} className="legend-item">
                            <div 
                                className="status-circle" 
                                style={{ backgroundColor: item.color }}
                            ></div>
                            <p className="legend-label">{item.label}</p>
                        </div>
                    ))}
                </div>
            </CardFooter>
        </Card>
    );
};

export default Calendar;
