import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Card, CardHeader, CardBody } from "react-bootstrap";
import { useState} from "react";
import "./Dashboard.css";

const Calendar = () => {
    const today = new Date();

    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState<number | null>(today.getDate());

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
        </Card>
    );
};

export default Calendar;
