import filter from 'lodash/filter';
import sumBy from 'lodash/sumBy';
import moment from 'moment';
import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import TokenService from '../services/TokenService';
import '../styles/TimeEntries.css';


const PersonalReport = (props) => {    
    let datetime = new moment(), month = datetime.month();
    const userInfo = TokenService.getUserInfo();
    const [timeEntries, setTimeEntries] = useState([]);    

    useEffect(() => {
        let now = moment();
        const year = now.year();
        const month = now.month();
        const day = now.date();
        let fromLoad = '';
        let toLoad = '';
        if (day >= 16) {
            fromLoad = moment().year(year).month(month).date(16).format('YYYY-MM-DD');
            toLoad = moment().year(year).month(month).date(1).add(1, 'months').subtract(1, 'days').format('YYYY-MM-DD');
        } else {
            fromLoad = moment().year(year).month(month).date(1).format('YYYY-MM-DD');
            toLoad = moment().year(year).month(month).date(15).format('YYYY-MM-DD');
        }
        axios.get(`api/redmine/timeentries?userApiKey=${TokenService.getApiKey()}&userId=${userInfo.id}&from=${fromLoad}&to=${toLoad}`)
            .then(success => setTimeEntries(success.data));            
    }, []);
    
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
                    day = <td key={i} className={month !== datetime.month() ? 'calendar-prior-months-date' : ''}>{datetime.format('D')}</td>;
                    const dayItems = filter(timeEntries, { "spent_on": currentDate });
                    const totalHours = sumBy(dayItems, 'hours');
                    if (dayItems.length) {
                        day = <td key={i} className={month !== datetime.month() ? 'calendar-prior-months-date' : ''}>{datetime.format('D')}<p>Tasks:{dayItems.length} Hours:{totalHours}</p></td>;
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
        <Container>
            <Row>
                <Col>
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
                </Col>
            </Row>
        </Container>
    )
};

export default PersonalReport;

