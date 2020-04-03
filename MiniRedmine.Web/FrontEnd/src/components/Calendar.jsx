import filter from 'lodash/filter';
import sumBy from 'lodash/sumBy';
import moment from 'moment';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import '../styles/TimeEntries.css';
const Calendar = (props) => {
    let datetime = new moment(), month = datetime.month();
    datetime.startOf('month').startOf('week');
    var week = 0, i;
    let rows = [];
    while (week < 6) {
        let days = [];
        for (i = 0; i < 7; i++) {
            const currentDate = datetime.format('YYYY-MM-DD');
            let day = <td key={i} className={month !== datetime.month() ? 'calendar-prior-months-date' : ''}>{datetime.format('D')}</td>;
            if (props.from !== '' && props.to !== '') {
                if (props.from <= currentDate && currentDate <= props.to) {
                    day = <td key={i} className={month !== datetime.month() ? 'calendar-prior-months-date' : ''}>{datetime.format('D')}<Button size="sm" onClick={() => props.handleShowModal(currentDate)}><i className="fas fa-plus-circle"></i></Button></td>;
                    const dayItems = filter(props.timeEntries, { "spent_on": currentDate });
                    const totalHours = sumBy(dayItems, 'hours');
                    if (dayItems.length) {
                        day = <td key={i} className={month !== datetime.month() ? 'calendar-prior-months-date' : ''}>{datetime.format('D')}<Button size="sm" onClick={() => props.handleShowModal(currentDate)}><i className="fas fa-plus-circle"></i></Button><p>Tasks:{dayItems.length} Hours:{totalHours}</p></td>;
                    }
                }
            }
            days.push(day);
            datetime.add(1, 'day');
        }
        let row = <tr key={week} className="calendar-month-row">{days}</tr>;
        week++;
        rows.push(row);
    }
    return (
        <Table striped bordered hover>
            <thead>
                <tr className="calendar-month-header-row">
                    <th>Domingo</th>
                    <th>Lunes</th>
                    <th>Martes</th>
                    <th>Miercoles</th>
                    <th>Jueves</th>
                    <th>Viernes</th>
                    <th>Sabado</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </Table>
    )
};

export default Calendar;

