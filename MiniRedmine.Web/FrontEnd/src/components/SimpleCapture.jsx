import axios from 'axios';
import filter from 'lodash/filter';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import TokenService from '../services/tokenService';
import SimpleCaptureItem from './SimpleCaptureItem';

function SimpleCapture() {
    const [timeEntries, setTimeEntries] = useState([]);
    const [alertData, setShowAlert] = useState({ show: false });
    let now = moment();
    const year = now.year();
    const month = now.month();
    const day = now.date();
    const minDate = day >= 16 ? moment().year(year).month(month).date(16).format('YYYY-MM-DD') : moment().year(year).month(month).date(1).format('YYYY-MM-DD');
    const maxDate = day >= 16 ? moment().year(year).month(month).date(1).add(1, 'months').subtract(1, 'days').format('YYYY-MM-DD') : moment().year(year).month(month).date(15).format('YYYY-MM-DD');
    const dateItems = TokenService.getDateArray(minDate, maxDate);
    const userTemplates = TokenService.getUserTemplates();
    useEffect(() => {
        const userInfo = TokenService.getUserInfo();
        axios.get(`api/redmine/timeentries?userApiKey=${TokenService.getApiKey()}&userId=${userInfo.id}&from=${minDate}&to=${maxDate}`)
            .then(success => setTimeEntries(success.data));
    }, []);

    function saveTimeEntries(spentOn, newTimeEntries)
    {
        axios.post(`api/redmine/timeentries?userApiKey=${TokenService.getApiKey()}&spentOn=${spentOn}`, newTimeEntries)
            .then(success => {                
                let newEntries = timeEntries.concat(success.data);                
                setTimeEntries(newEntries);                
            }, error => { setShowAlert({ error: error.response.data, show: true }); });
    }

    const listGroupItems = dateItems.map((item, index) => {
        const entries = filter(timeEntries, { "spent_on": item.format('YYYY-MM-DD') });
        return (<SimpleCaptureItem key={index} now={now} dateItem={item} userTimeEntries={entries} userTemplates={userTemplates} saveTimeEntries={saveTimeEntries} />)
    });
    let alertElement = <React.Fragment />;
    if (alertData.show) {
        alertElement = (
            <Alert variant="danger" onClose={() => setShowAlert({ show: false })} dismissible>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    {JSON.stringify(alertData.error, null, 2)}
                </p>
            </Alert>
        );
    }
    return (
        <Container>
            <h1 className="page-header"><i className="far fa-calendar-alt"></i> Simple Capture</h1>
            {alertElement}
            <Row>
                <Col>
                    <ListGroup>
                        {listGroupItems}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
}

export default SimpleCapture;