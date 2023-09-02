import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, parse } from 'date-fns';
import './styles/calendar.css';

interface RenderHeaderProps {
    currentMonth: Date;
    prevMonth: () => void;
    nextMonth: () => void;
}

const RenderHeader: React.FC<RenderHeaderProps> = ({ currentMonth, prevMonth, nextMonth }) => {
    return (
        <div className="header row">
            <div className="col col-start">
                <span className="text">
                    {format(currentMonth, 'yyyy')}
                </span>
                <span className="text month">
                        {format(currentMonth, "M")}월
                </span>
            </div>
            <div className="col col-end">
                <Icon icon="bi:caret-left" onClick={prevMonth} />
                <Icon icon="bi:caret-right" onClick={nextMonth} />
            </div>
        </div>
    );
};

const RenderDays: React.FC = () => {
    const date = ['일', '월', '화', '수', '목', '금', '토'];

    return (
        <div className="days row">
            {date.map((day, index) => (
                <div className="col" key={index}>
                    {day}
                </div>
            ))}
        </div>
    );
};

interface RenderCellsProps {
    currentMonth: Date;
    selectedDate: Date;
    onDateClick: (date: Date) => void;
}

const RenderCells: React.FC<RenderCellsProps> = ({ currentMonth, selectedDate, onDateClick }) => {
    const monthStart = startOfMonth(currentMonth); //달의 첫 날짜
    const monthEnd = endOfMonth(monthStart); //달의 마지막 날짜
    const startDate = startOfWeek(monthStart); //달의 첫 날짜의 주의 일요일 날짜
    const endDate = endOfWeek(monthEnd); //달의 마지막 날짜의 주의 토요일 날짜

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            const formattedDate = format(day, 'd');
            const cloneDay = day;

            days.push(
                <div
                    className={`col cell row ${
                        !isSameMonth(day, monthStart)
                            ? 'disabled'
                            : isSameDay(day, selectedDate)
                                ? 'selected'
                                : format(currentMonth, 'M') !== format(day, 'M')
                                    ? 'not-valid'
                                    : 'valid'
                    }`}
                    key={day.toString()}
                    onClick={() => onDateClick(parse(cloneDay.toString(), 'yyyy-MM-dd', new Date()))}
                >
                    <span className={format(currentMonth, 'M') !== format(day, 'M') ? 'text not-valid' : ''}>
                        {formattedDate}
                    </span>
                </div>
            );
            day = addDays(day, 1);
        }
        rows.push(
            <div className="row" key={day.toString()}>
                {days}
            </div>,

        );
        days = [];
    }
    return <div className="body">{rows}</div>;
};

interface CalendarProps {}

const Calendar: React.FC<CalendarProps> = () => {
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
    };

    return (
        <div className="calendar">
            <RenderHeader
                currentMonth={currentMonth}
                prevMonth={prevMonth}
                nextMonth={nextMonth}
            />
            <RenderDays />
            <RenderCells
                currentMonth={currentMonth}
                selectedDate={selectedDate}
                onDateClick={handleDateClick}
            />
        </div>
    );
};

export default Calendar;


/*import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays, parse } from 'date-fns';

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
    return (
        <div className="header row">
            <div className="col col-start">
                <span className="text">
                    <span className="text month">
                        {format(currentMonth, 'M')}월
                    </span>
                    {format(currentMonth, 'yyyy')}
                </span>
            </div>
            <div className="col col-end">
                <Icon icon="bi:arrow-left-circle-fill" onClick={prevMonth} />
                <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth} />
            </div>
        </div>
    );
};

const RenderDays = () => {
    const days = [];
    const date = ['Sun', 'Mon', 'Thu', 'Wed', 'Thurs', 'Fri', 'Sat'];

    for (let i = 0; i < 7; i++) {
        days.push(
            <div className="col" key={i}>
                {date[i]}
            </div>,
        );
    }

    return <div className="days row">{days}</div>;
};

const RenderCells = ({ currentMonth, selectedDate, onDateClick }) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'd');
            const cloneDay = day;
            days.push(
                <div
                    className={`col cell ${
                        !isSameMonth(day, monthStart)
                            ? 'disabled'
                            : isSameDay(day, selectedDate)
                                ? 'selected'
                                : format(currentMonth, 'M') !== format(day, 'M')
                                    ? 'not-valid'
                                    : 'valid'
                    }`}
                    key={day.toString()}
                    onClick={() => onDateClick(parse(cloneDay.toString(), 'yyyy-MM-dd', new Date()))}
                >
                    <span
                        className={
                            format(currentMonth, 'M') !== format(day, 'M')
                                ? 'text not-valid'
                                : ''
                        }
                    >
                        {formattedDate}
                    </span>
                </div>,
            );
            day = addDays(day, 1);
        }
        rows.push(
            <div className="row" key={day.toString()}>
                {days}
            </div>,
        );
        days = [];
    }
    return <div className="body">{rows}</div>;
};

export const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };
    const onDateClick = (day) => {
        setSelectedDate(day);
    };
    return (
        <div className="calendar">
            <RenderHeader
                currentMonth={currentMonth}
                prevMonth={prevMonth}
                nextMonth={nextMonth}
            />
            <RenderDays />
            <RenderCells
                currentMonth={currentMonth}
                selectedDate={selectedDate}
                onDateClick={onDateClick}
            />
        </div>
    );
};

export default Calendar;*/

