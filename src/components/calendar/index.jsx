import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const ViewCalendar = ({ display, handleView, onSelectDate }) => {
    const [calendarDate, setCalendarDate] = useState(null);
    const [currMonthCalendar, setCurrMonthCalendar] = useState(null);
    const [currYearCalendar, setCurrYearCalendar] = useState(null);
    const [field, setField] = useState({});

    useEffect(() => {
        setCalendarDate(new Date().getDate());
        setCurrMonthCalendar(new Date().getMonth());
        setCurrYearCalendar(new Date().getFullYear());
    }, [display])

    useEffect(() => {
        const getLastDay = (yy, mm) => new Date(yy, mm + 1, 0).getDate();
        const getFirstDayOfMonth = (yy, mm) => {
            const firstDayOfCurrentMonth = new Date(yy, mm, 1); // дата на момент первого числа текущего месяца
            let dayWeek = firstDayOfCurrentMonth.getDay(); // от 0 до 6, причем 0 - это воскресение
            dayWeek = dayWeek === 0 ? 7 : dayWeek;
            return {
                dayWeek, // номер дня недели первого числа текущего месяца
                maxDays: getLastDay(yy, mm) // максимальное количество дней  в текуще месяце (который был передан в качестве параметре )
            };
        }

        const filterWeeks = (week, arr) => {
            const obj = {}
            let x = [];
            for (let i = 0, j = 0; i < week * 7; i++) {
                if (i !== 0 && i % 7 === 0) {
                    j++;
                    obj[j] = [...x]
                    x = []
                }
                x.push(arr[i]);
            }
            return obj;
        }

        const maximumDaysInPrevMonth = getLastDay(currYearCalendar, currMonthCalendar - 1);
        const firstDay = getFirstDayOfMonth(currYearCalendar, currMonthCalendar);
        const maxDaysInCurrentMonth = firstDay.maxDays;
        const firstDayWeek = firstDay.dayWeek;

        let weeks = null;
        if (
            (firstDay.maxDays === 31 && firstDay.dayWeek === 6) ||
            (firstDay.dayWeek === 7 && firstDay.maxDays >= 30)
        ) {
            weeks = 6;
        } else if (firstDay.maxDays === 28 && firstDay.dayWeek === 1) {
            weeks = 4;
        } else {
            weeks = 5;
        }

        const firstCell = maximumDaysInPrevMonth - firstDayWeek + 2;
        let arrayPrevDays = [];
        for (let i = firstCell; i <= maximumDaysInPrevMonth; i++) {
            arrayPrevDays.push(String(i));
        }

        const arrayCurrDays = (new Array(maxDaysInCurrentMonth)).fill(1).map((a, i) => i + a);
        const halfArray = [...arrayPrevDays, ...arrayCurrDays];

        const arrayNextDays = [];
        for (let i = halfArray.length, j = 1; i < weeks * 7; i++ , j++) {
            arrayNextDays.push(String(j));
        }

        const fullArray = [...halfArray, ...arrayNextDays];
        const fieldState = filterWeeks(weeks + 1, fullArray);
        setField({ ...fieldState });
    }, [currMonthCalendar, currYearCalendar]);

    const renderCalendarMonthHeader = () => {
        const text = [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь'
        ];
        return text[currMonthCalendar] + ' ' + currYearCalendar;
    }

    const handleSelectDates = e => {
        const { target } = e;
        const cell = target.getAttribute('data-id');
        const month = currMonthCalendar + 1;
        const str = `${cell < 10 ? '0' + cell : cell}.${month < 10 ? '0' + month : month + 1}.${currYearCalendar}`;
        onSelectDate(str);
        handleView();
    }

    const renderOneCell = (cell) => {
        return <td
            data-id={cell}
            className={typeof cell === 'string' ? 'not_current'
                : new Date().getMonth() === currMonthCalendar && calendarDate === cell
                    ? 'today' : ''}
            onClick={typeof cell === 'string' ? null : handleSelectDates}
            key={cell}>
            {cell}
        </td>
    }

    const handleChangePage = (e) => {
        const { currentTarget: target } = e;
        if (target.getAttribute('data-id') === 'nextButton') {
            if (currMonthCalendar === 11) {
                setCurrMonthCalendar(0);
                setCurrYearCalendar(state => state + 1);
                return false;
            }
            setCurrMonthCalendar(state => state + 1);
        } else {
            if (currMonthCalendar === 0) {
                setCurrMonthCalendar(11);
                setCurrYearCalendar(state => state - 1);
                return false;
            }
            setCurrMonthCalendar(state => state - 1);
        }
    }

    return (
        <>
            {display && <div className="micalendar"
                style={{ display: 'block', position: 'absolute' }}>
                <div className="header_wrap">
                    <div className="header">
                        <p>{renderCalendarMonthHeader()}</p>
                    </div>
                    <div className="arrows">
                        <div
                            data-id="prevButton"
                            onClick={handleChangePage}
                            className="arrows_left">
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </div>
                        <div
                            data-id="nextButton"
                            onClick={handleChangePage}
                            className="arrows_right">
                            <FontAwesomeIcon icon={faAngleRight} />
                        </div>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Пн</th>
                            <th>Вт</th>
                            <th>Ср</th>
                            <th>Чт</th>
                            <th>Пт</th>
                            <th>Сб</th>
                            <th>Вс</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.values(field).map((arr, index) => {
                                return (
                                    <tr key={index}>
                                        {arr.map(renderOneCell)}
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <hr />
                <div className="btn-group">
                    <input
                        type="button"
                        onClick={handleView}
                        value="Отмена"
                        className="btn btn-sm btn-outline-secondary" />
                </div>
            </div>

            }
        </>
    );
};

ViewCalendar.propTypes = {
    display: PropTypes.bool,
    handleView: PropTypes.func,
    onSelectDate: PropTypes.func
};

export default React.memo(ViewCalendar);