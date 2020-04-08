import concat from 'lodash/concat';
import sumBy from 'lodash/sumBy';
import React, { useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Row from 'react-bootstrap/Row';
import UserInfoService from '../services/UserInfoService';
import NewTemplateForm from './NewTemplateForm';

function Templates() {
    const TEMPLATES_STORAGE_KEY = 'MiniRedmineTemplates';
    const [templates, setTemplates] = useState(JSON.parse(localStorage.getItem(TEMPLATES_STORAGE_KEY) || '[]'));
    const templateItems = templates.map((item, index) => <ListGroupItem key={item.Id}>{item.IssueId} | {UserInfoService.getTimeEntryActivityById(item.ActivityId).name} |{item.Comments} | {item.Hours} | <Button type="button" variant="danger" onClick={() => deleteTemplate(index)}><i className="fas fa-trash"></i></Button></ListGroupItem>);
    const totalHours = sumBy(templates, (itm) => new Number(itm.Hours)).toString();

    function addTemplate(newTemplate) {
        let newTemplates = concat(templates, newTemplate);
        setTemplates(newTemplates);
        localStorage.setItem(TEMPLATES_STORAGE_KEY, JSON.stringify(newTemplates));
    }

    function deleteTemplate(index) {
        var newTemplates = Array.from(templates);;
        newTemplates.splice(index, 1);
        setTemplates(newTemplates);
        localStorage.setItem(TEMPLATES_STORAGE_KEY, JSON.stringify(newTemplates));
    }
    const totalTemplateTime = totalHours > 0 ? <h3>Total Hours <Badge variant="primary">{totalHours}</Badge></h3> : <React.Fragment />;

    return (
        <Container>
            <h2 className="mb-3">Templates</h2>
            <Row>
                <Col>
                    <NewTemplateForm addTemplate={addTemplate} />
                </Col>
                <Col>
                    {totalTemplateTime}
                    <ListGroup>
                        {templateItems}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
}

export default Templates;