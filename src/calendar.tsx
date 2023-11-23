import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, parse } from 'date-fns';
import './styles/calendar.css';
import styles from './styles/Modal.module.css'
import {useNavigate} from "react-router-dom";
import Modal from 'react-modal';


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
    const navigate = useNavigate();

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleCellClick = (date: Date) => {
        onDateClick(date);
        console.log("선택된 날짜" + date);
        //console.log(date.toLocaleDateString())
        window.localStorage.setItem("selectedDate", date.toLocaleDateString())

        if(window.localStorage.getItem(date.toLocaleDateString())){
            console.log("저장되어있음");
        }
        else{
            setModalIsOpen(true);
        }
    }

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
                    onClick={() => handleCellClick(cloneDay)}
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

    /*overlay는 모달 창 바깥 부분
    content는 모달 창부분*/
    const customModalStyles: Modal.Styles = {
        overlay: {
            backgroundColor: " rgba(0, 0, 0, 0.4)",
            width: "100%",
            height: "100vh",
            zIndex: "10",
            position: "fixed",
            top: "0",
            left: "0",
        },
        content: {
            width: "400px",
            height: "120px",
            zIndex: "150",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "10px",
            boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
            backgroundColor: "white",
            display: "flex",
            flexDirection:"column",
            justifyContent:"space-around",
            textAlign:"center",
            overflow: "auto",
        },

    };

    return(
        <>
            <div className="body">
                {rows}
                {localStorage.getItem(selectedDate.toLocaleDateString()) != null
                    ?
                    <div className="diary">
                        {JSON.parse(localStorage.getItem(selectedDate.toLocaleDateString())).sticker}
                        <div dangerouslySetInnerHTML={ {__html: JSON.parse(localStorage.getItem(selectedDate.toLocaleDateString())).content} }></div>
                    </div>
                    : null
                }
            </div>
            {/* 일기 작성 페이지로 넘어가기 전 모달 */}
            <Modal
                style={customModalStyles}
                isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                작성하신 일기가 없습니다.
                일기를 작성하시겠습니까?
                <div className={styles.divModalBtn}>
                    <button className={styles.btnModal} onClick={() => navigate("/addDiary")}>
                        예
                    </button>
                    <button className={styles.btnModal} onClick={() => setModalIsOpen(false)}>
                        아니요
                    </button>
                </div>
            </Modal>
        </>
    );
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