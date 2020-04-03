import filter from 'lodash/filter';
import moment from 'moment';
import React from 'react';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';


const Cardlendar = (props) => {
    let datetime = new moment(), month = datetime.month();
    datetime.startOf('month').startOf('week');
    var week = 0, i;
    //let rows = [];
    let days = [];    
    while (week < 6) {
        //let days = [];
        for (i = 0; i < 7; i++) {
            const currentDate = datetime.format('YYYY-MM-DD');
            const weekday = datetime.format('dddd');
            const dayOfWeek = datetime.day();
            const variant = dayOfWeek === 0 || dayOfWeek === 6 ? "warning" : "info";
            if (props.from <= currentDate && currentDate <= props.to) {
                const dayItems = filter(props.timeEntries, { "spent_on": currentDate }).map(entry => <ListGroupItem key={entry.id}>{entry.comments}</ListGroupItem>);
                let day = (
                    <ListGroupItem key={currentDate} variant={variant}>
                        <h3>{currentDate}&nbsp;<small>{weekday}</small> <Button size="sm" variant="secondary" onClick={() => props.handleShowModal(currentDate)}><i className="fas fa-plus-circle"></i> Add Task</Button></h3>
                        <ListGroup>
                            {dayItems}
                        </ListGroup>
                    </ListGroupItem>
                );
                days.push(day);
            }
            datetime.add(1, 'day');
        }
        //rows.push(<Row key={week}>{days}</Row>);
        week++;
    }
    return (
        <ListGroup>
            {days}
        </ListGroup>
    )
};

export default Cardlendar;

