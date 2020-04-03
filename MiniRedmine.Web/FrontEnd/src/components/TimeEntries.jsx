import axios from 'axios';
import filter from 'lodash/filter';
import sumBy from 'lodash/sumBy';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Modal from 'react-bootstrap/Modal';
import TokenService from '../services/tokenService';
import Calendar from './Calendar';


function TimeEntries() {
    const TEMPLATES_STORAGE_KEY = 'MiniRedmineTemplates';
    const [showModal, setShowModal] = useState(false);
    const [addTaskToDate, setAddTaskToDate] = useState(moment());
    const [modalTasks, setModalTasks] = useState([]);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    const userInfo = TokenService.getUserInfo();
    const [timeEntries, setTimeEntries] = useState([]);

    const handleCloseModal = () => { setShowModal(false); }
    const handleShowModal = (clickedDate) => {
        let modalDate = moment(clickedDate, 'YYYY-MM-DD');
        setModalTasks(filter(timeEntries, { "spent_on": clickedDate }));
        setAddTaskToDate(modalDate);
        setShowModal(true);
    };


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
            .then(success => setTimeEntries(success.data))
            .finally(() => setFrom(fromLoad), setTo(toLoad));
    }, []);

    let templateItems = null;
    const modalItems = modalTasks.map(entry => <ListGroupItem key={entry.id}>Issue: {entry.issue.id} | Hours: {entry.hours} | {entry.activity.name} | {entry.comments} </ListGroupItem>);
    if (modalItems.length === 0) {
        templateItems = JSON.parse(localStorage.getItem(TEMPLATES_STORAGE_KEY) || '[]').map(entry => <ListGroupItem key={entry.Id}>Issue: {entry.IssueId} | Hours: {entry.Hours} | {entry.ActivityId} | {entry.Comments} </ListGroupItem>)
    }
    return (
        <Container>
            <h1 className="page-header"><i className="far fa-calendar-alt"></i> Time Entries</h1>
            <Calendar timeEntries={timeEntries} handleShowModal={handleShowModal} from={from} to={to}/>
            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add tasks to {addTaskToDate ? addTaskToDate.format('dddd') : ''}&nbsp;{addTaskToDate ? addTaskToDate.format('YYYY-MM-DD') : ''} <span className="text-info">Total Hours: {sumBy(modalTasks, 'hours')}</span></Modal.Title>                   
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        {modalItems}
                        {templateItems}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                    <Button variant="primary" onClick={handleCloseModal}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
export default TimeEntries;
/*
 * <Row>
                <Col>
                    <Cardlendar timeEntries={timeEntries} from={from} to={to} handleShowModal={handleShowModal} />
                </Col>
            </Row>
<ListGroupItem key={entry.id}>
    <Form>
        <Form.Group>
            <Form.Control readonly type="text" value={entry.issue.id} /><Form.Control readonly type="text" value={entry.comments} /><TimeEntryActivitiesSelect readonly selectedActivity={entry.activity.id} timeEntryActivities={TokenService.getTimeEntryActivities()} />
        </Form.Group>
    </Form>
</ListGroupItem>
*/

