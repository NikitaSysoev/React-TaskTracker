import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const ViewCalendar = ({ display, handleView }) => {
    const [calendarDate, setCalendarDate] = useState(null);
    const [currMonthCalendar, setCurrMonthCalendar] = useState(null);
    const [currYearCalendar, setCurrYearCalendar] = useState(null);
    console.log(calendarDate, currMonthCalendar, currYearCalendar)

    useEffect(() => {
        setCalendarDate(new Date());
        setCurrMonthCalendar(new Date().getMonth());
        setCurrYearCalendar(new Date().getFullYear());
    }, [display])

    const handleCancel = () => handleView();

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

    // const renderOneCalendarCell = () => {
    //     if (!className && !dataFullDate && !dataDaymonth) {
    //         return '<td>&nbsp;</td>';
    //       }
    //       return (
    //         '<td onclick="handleClickCalendarCell(event)" ' +
    //         className +
    //         ' data-fulldate="' +
    //         dataFullDate +
    //         '" data-daymonth="' +
    //         dataDaymonth +
    //         '">' +
    //         (cellText === null ? dataDaymonth : cellText) +
    //         '</td>'
    //       );
    // }

    // const renderCells = () => {
    //     const firstDay = getFirstDayOfMonth(year, month);
    //     return (
    //      <tr>

    //      </tr>
    //     )
    // }

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
                    <div class="arrows">
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
                        <tr><td class="not_current" >30</td></tr>
                    </tbody>
                </table>
                <hr />
                <div className="btn-group">
                    <input
                        type="button"
                        onClick={handleCancel}
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
    handleView: PropTypes.func
};

export default React.memo(ViewCalendar);